import mongoose from 'mongoose';
import 'dotenv/config'
import { z } from 'zod';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { contentModel, linkModel, tagModel, UserModel } from '../db.js';
import { JWT_PASSCODE, MONGODB_URL } from '../config.js';
import { userMiddleware } from '../middleware.js';
import { Router } from 'express';

const userRouter = Router()

//DB-connection
async function connectDb() {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("Database Connected");
    } catch (err) {
        console.error("Database not connected due to some internal issue");
    }
}
connectDb();

userRouter.post("/signup", async (req, res) => {
    const signupZodSchema = z.object({
        username: z.string().email(),
        password: z.string().min(8).max(12)
    });
    try {
        const parsedData = signupZodSchema.safeParse(req.body);
        if (!parsedData.success) {
            return res.status(400).json({
                message: "incorrect format"
            });
        }
        const { username, password } = parsedData.data
        const existingUser = await UserModel.findOne({ username })
        if (existingUser) {
            return res.status(409).json({
                message: "email are used"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.create({
            username,
            password: hashedPassword
        })
        return res.status(201).json({
            message: "you are signed up "
        });
    }
    catch (e) {
        console.error("signup error");
        return res.status(500).json({
            messge: "Server Error"
        });
    }
});


userRouter.post("/signin", async (req, res) => {
    const signinZodSchema = z.object({
        username: z.string().email(),
        password: z.string().min(8).max(12)
    });
    try {
        const parseData = signinZodSchema.safeParse(req.body)
        if (!parseData.success) {
            return res.status(400).json({
                message: "invalid format"
            });
        }
        const { username, password } = parseData.data;
        const existingUser = await UserModel.findOne({
            username: username,
        });
        if (!existingUser) {
            return res.status(403).json({
                message: "Incorrect Credentials!"
            });
        }
        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (passwordMatch) {
            const token = jwt.sign({
                userId: existingUser._id
            }, JWT_PASSCODE);
            return res.status(200).json({
                message: "UserModel signed in successfully",
                token: token
            });
        } else {
            return res.status(403).json({
                message: "Incorrect Credentials!"
            });
        }
    }
    catch (e) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
});

userRouter.post("/content", userMiddleware, async (req, res) => {
    const contentTypes = ["link", "document", "twitter", "youtube"] as const
    const contentZodSchema = z.object({
        link: z.string().url(),
        type: z.enum(contentTypes),
        title: z.string().min(1, "Title is required"),
        tags: z.array(z.string()).optional()
    });
    const content = req.body
    const userId = req.userId
    const result = contentZodSchema.safeParse(content);
    if (!result.success) {
        return res.status(400).json({
            message: "Error inputs"
        });
    }
    const { link, type, title, tags } = result.data;
    if (!userId) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    try {
        const tagDocs = await Promise.all(
            (tags ?? []).map(async (tagTitle: string) => {
                let tag = await tagModel.findOne({ title: tagTitle })
                if (!tag) {
                    tag = await tagModel.create({ title: tagTitle })
                }
                return tag._id
            })
        )
        await contentModel.create({
            link,
            type,
            title,
            tags: tagDocs,
            userId: new mongoose.Types.ObjectId(userId)
        })
        res.status(201).json({
            message: "Content created successfully"
        });
    } catch (e) {
        console.error("Error creating content:", e);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

userRouter.get("/content", userMiddleware, async (req, res) => {
    try {
        const userId = req.userId
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        const Contents = await contentModel.find({ userId: new mongoose.Types.ObjectId(userId) })
            .populate("tags", "title")
            .populate("userId", "username")
            .sort({ _id: -1 })
        return res.status(200).json({
            Contents
        });
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
});

userRouter.delete("/content", userMiddleware, async (req, res) => {
    try {
        const contentId = req.body.contentId
        const userId = req.userId

        await contentModel.deleteMany({
            _id: contentId,
            userId: new mongoose.Types.ObjectId(userId)
        })
        res.status(200).json({
            message: "Successfully  Deleted!"
        });
    } catch (e) {
        console.log(e)
        return res.status(403).json({
            meassage: "Error in inputs"
        })
    }

});

userRouter.post("/brain/share", userMiddleware, async (req, res) => {
    try {
        const share = req.body.share
        const userId = req.userId
        if (share) {
            const ExistingLink = await linkModel.findOne({
                userId: new mongoose.Types.ObjectId(userId)
            })
            if (ExistingLink) {
                return res.status(200).json({
                    "link": `${ExistingLink.hash}`
                })
            }
            const link = await linkModel.create({
                userId: new mongoose.Types.ObjectId(userId)
            })
            return res.status(200).json({
                "link": `${link.hash}`
            })
        }
        else {
            await linkModel.deleteOne({
                userId: new mongoose.Types.ObjectId(userId)
            })
            return res.status(200).json({
                message: "Successfull Deleted!"
            })
        }
    }
    catch (e) {
        console.log(e)
        return res.status(403).json({
            message: "Internal Error!"
        })
    }
});

userRouter.get("/brain/:shareLink", userMiddleware, async (req, res) => {

    const hash = req.params.shareLink as string
    const linkHash = await linkModel.findOne({
        hash: hash
    })
    if (!linkHash) {
        return res.status(404).json({
            message: "incorrect inputs"
        });
    }
    const content = await contentModel.find({
        userId: linkHash.userId
    })
        .populate("tags", "title")
    const user = await UserModel.findOne({
        _id: linkHash.userId
    })
    if (!user) {
        return res.status(411).json({
            message: "user does not exits of the content"
        })
    }

    res.status(200).json({
        username: user.username,
        content: content
    })
});

export { userRouter }