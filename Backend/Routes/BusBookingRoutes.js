import express from 'express';
import { bookBus  , getBus , getMyBusBookings,cancelBookings} from '../Controllers/BusBooking.controller.js';

const router = express.Router()

router.post("/bookBus/:BusNo",bookBus)
router.get("/getBus/:BusNo",getBus)
router.get("/busBookings/:id",getMyBusBookings)
router.delete("/cancelBusBooking/:id",cancelBookings)

export default router
