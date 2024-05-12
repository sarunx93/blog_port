import express from "express";
import dotenv from 'dotenv'
import { connectDB } from './utils/connectDB.js'
import cookieParser from "cookie-parser";
//Routes
import userRoutes from './routes/userRoutes.js'

//middleware
import authen from "./middleware/auth.js";

dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser())

const port = process.env.PORT || 5000


// app.use('/api/v1', (req,res)=>{
//     res.send({msg:'hello'})
// })

app.use('/api/v1/user', userRoutes)

const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log(`Server is running on port ${port}`)
        })
    }
    catch(err){
        console.log(err)
    }
}

start()