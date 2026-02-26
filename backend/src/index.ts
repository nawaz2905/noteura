import express from 'express'
import cors from 'cors'
import './config.js'
import './db.js'
import { userRouter } from './routes/user.js'


const app = express()

app.use(express.json())
app.use(cors({
  origin: "*",
  // credentials: true, // Not needed as we store token in localStorage
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));



app.use("/api/v1", userRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});


export default app;