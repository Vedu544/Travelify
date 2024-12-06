import express from 'express';
import { BookFlight , getFlightDetails , getMyFlightBookings,cancelFlightBookings } from '../Controllers/FlightBookings.controller.js';

const router = express.Router();

router.post('/FlightBook/:FlightNo', BookFlight);
router.get("/FlightInfo/:FlightNo",getFlightDetails)
router.post('/getMyFlightBookings/:id', getMyFlightBookings);
router.delete('/cancelFlight/:id', cancelFlightBookings);


export default router;