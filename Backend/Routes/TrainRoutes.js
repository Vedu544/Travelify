import { filterByStation, filterbyHighToLowPrice, filterbyLowToHighPrice } from "../Controllers/Train.controller.js";
import express from "express";

const router = express.Router();

// Route to filter trains by departure and arrival stations
router.get('/filter/station', filterByStation);

// Route to filter trains by price from low to high
router.get('/filter/price/low-to-high', filterbyLowToHighPrice);

// Route to filter trains by price from high to low
router.get('/filter/price/high-to-low', filterbyHighToLowPrice);



export default router;

