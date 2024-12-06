import express from "express"
import { createRoom,deleteRoom,getRoom,getRooms,updateRoom,bookRoom,roomBookings ,cancelRoomBookings} from "../Controllers/room.controller.js"
import checkToken from "../Middlewares/token.middlware.js"


const router = express.Router()

//by admin use
router.post("/:hotelid",createRoom)
router.put("/:Roomid",updateRoom)
// router.delete("/:Roomid/:hotelid",deleteRoom)

//by user
router.get("/rooms/:roomid",getRoom)
router.get("/rooms",getRooms)

router.post("/roomBookings/:id", checkToken, roomBookings)
router.get("/:roomid",bookRoom)

//book room
router.post("/bookRoom/:roomid", bookRoom); 

//cancel bookings
router.delete("/cancelRoomBookings/:id",cancelRoomBookings)

export default router
