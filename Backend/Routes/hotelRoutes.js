import express from "express"
import { createHotel,updateHotel,deleteHotel,getHotels,getHotel,getHotelByCity,getHotelWithRooms, } from "../Controllers/hotels.controller.js"


const router  = express.Router()

router.post("/createhotel",createHotel)
router.put("/updatehotel/:id",updateHotel)
router.delete("/deletehotel/:id",deleteHotel)
router.get("/gethotels",getHotels)
router.get("/gethotel/:id",getHotel)
router.get("/getHotelbyCity/:city",getHotelByCity)
router.get("/getHotelWithRooms/:id" ,getHotelWithRooms)

export default router
