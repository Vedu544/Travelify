import dotenv from 'dotenv'
dotenv.config({ path: "./.env" })  // ← run this FIRST

import connectDB from './Config/db.js'
import { app } from './app.js'
import express from 'express'

app.use(express.json())
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`server connected on PORT ${process.env.PORT}`)
    })
  })
  .catch((err) => {
    console.log("error, try to reconnect")
  })