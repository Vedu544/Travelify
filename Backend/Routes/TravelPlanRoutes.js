import express from "express"
import { getTravelPlan } from "../Controllers/Travel.controllers.js"


const router = express.Router()


router.post("/getTravelPlan",getTravelPlan)


export default router
