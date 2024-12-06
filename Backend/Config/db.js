import mongoose from 'mongoose'
import {DB_NAME} from "../constant.js"


const connectDB = async ()=>{
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`database connected DB HOST: ${connection.connection.host}`)
    } catch (error) {
        console.log("mongodb connection failed",error)
        
    }
}

export default connectDB