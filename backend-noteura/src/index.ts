import express from 'express'
import cors from 'cors'

import './config.js'
import './db.js'
import {userRouter} from './routes/user.js'


const app = express()

app.use(express.json())
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use("/api/v1",userRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});


export default app;