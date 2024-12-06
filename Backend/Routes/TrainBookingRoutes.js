import { bookTrain, getTrainDetails , getMyTrainBookings,cancelBookings} from "../Controllers/TrainBookings.controller.js";
import express from "express";

const router = express.Router();

router.post("/bookTrainTicket/:trainNumber", bookTrain);
router.get("/getTrain/:trainNo", getTrainDetails); // Ensure the parameter name matches
router.post ("/getMyTrainBookings/:id",getMyTrainBookings)
router.delete("/cancelBookings/:id",cancelBookings)

export default router;
