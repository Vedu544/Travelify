import express, { Router } from 'express';
import { getFlightDetails } from '../Controllers/Flight.controller.js';

const router = express.Router();

router.get("/FlightStations",getFlightDetails)

export default router;