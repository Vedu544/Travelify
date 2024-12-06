import { getDetailsBus } from "../Controllers/Bus.controller.js";
import express from "express";

const router = express.Router()

router.get("/busDetails/", getDetailsBus)

export default router