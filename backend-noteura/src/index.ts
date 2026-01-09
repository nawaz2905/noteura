import './config.js'
import './db.js'
import cors from 'cors'
import {userRouter} from './routes/user.js'

import express from 'express'

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/v1",userRouter)

export default app;