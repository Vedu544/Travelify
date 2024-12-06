import { PropertyBookings,getMyPropertyBookings,cancelBookings} from "../Controllers/PropertyBookings.controller.js";
import express from "express";
import checkToken from "../Middlewares/token.middlware.js";
const router = express.Router()

router.post("/PropertyBookings/:accommodationId", PropertyBookings)
router.post("/getMyPropertyBookings/:id",checkToken,getMyPropertyBookings)
router.delete("/cancelBookings/:id",cancelBookings)

export default router
