import './config.js'
import './db.js'
import cors from 'cors'
import {userRouter} from './routes/user.js'

import express from 'express'

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/v1",userRouter)

app.listen(3000,()=>{
    console.log("listening to port 3000")
})