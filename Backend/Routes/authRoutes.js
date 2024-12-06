import express from "express"
import { registerUser,loginUser,logoutUser, getUser } from "../Controllers/Auth.controller.js"

const router = express.Router()


router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser)
router.get("/Profile",getUser)




export default router