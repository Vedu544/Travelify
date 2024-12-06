import dotenv from 'dotenv'
import connectDB from './Config/db.js'
import {app} from './app.js'
import express from 'express'


dotenv.config({
    path : "./env"
})

app.use(express.json())

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log(`server connected on PORT ${process.env.PORT}`)
    })
}).catch((err)=>{
    console.log("error,try to reconnect")
})