import { model, Schema, Types } from "mongoose";
import mongoose from "mongoose";
import crypto from 'crypto';

const UserShcema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
export const UserModel = model("User", UserShcema);

const tagSchema = new Schema({
    title: { type: String, unique: true, required: true }
});
export const tagModel = model("Tag", tagSchema);

const contentTypes = ["link", "document", "twitter", "youtube", "notes"];
const contentSchema = new Schema({
    link: { type: String, required: false },
    type: { type: String, enum: contentTypes },
    title: { type: String, required: true },
    text: { type: String, required: false },
    tags: [{ type: Types.ObjectId, ref: "Tag" }],
    userId: { type: Types.ObjectId, ref: "User", required: true }
});
export const contentModel = model("Contents", contentSchema);

function generateShareHash(length = 20) {
    return crypto.randomBytes(length).toString("hex").slice(0, length)
}

const linkSchema = new Schema({
    hash: {
        type: String,
        required: true,
        unique: true,
        default: () => generateShareHash(20)
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
});

export const linkModel = model("Links", linkSchema);



