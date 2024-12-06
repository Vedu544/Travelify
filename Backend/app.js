import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "./Routes/authRoutes.js"
import hotelRoutes from "./Routes/hotelRoutes.js"
import roomRoutes from "./Routes/roomRoutes.js"
import propertyRoutes from "./Routes/propertyRoutes.js"
import PropertyBookingRoutes from "./Routes/PropertyBookingRoutes.js"
import placeRoutes from "./Routes/placeRoutes.js"
import TravelPlanRoutes from "./Routes/TravelPlanRoutes.js"
import TrainRoutes from "./Routes/TrainRoutes.js"
import TrainBookingRoutes from "./Routes/TrainBookingRoutes.js"
import FlightRoutes from "./Routes/FlightRoutes.js"
import FlightBookingRoutes from "./Routes/FlightBookingRoutes.js"
import BusRoutes from "./Routes/BusRoutes.js"
import BusBookingRoutes from "./Routes/BusBookingRoutes.js"
import SearchRoutes from "./Routes/SearchRoutes.js"
const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
}))
console.log(process.env.CORS_ORIGIN)

app.use(express.json({ limit: '50kb'  }))
app.use(express.urlencoded({extended:true, limit: '50kb'  }))

app.use(express.static('public'))
app.use(cookieParser())

//http://localhost:3000/
app.use("/api/auth",authRoutes)
app.use("/api/hotels",hotelRoutes)
app.use("/api/rooms",roomRoutes)
app.use("/api/properties",propertyRoutes)
app.use("/api/bookings",PropertyBookingRoutes)
app.use("/api/places",placeRoutes)
app.use("/api/Travel",TravelPlanRoutes)
app.use("/api/Trains",TrainRoutes)
app.use("/api/TrainBookings",TrainBookingRoutes)
app.use("/api/Flights",FlightRoutes)
app.use("/api/FlightBookings",FlightBookingRoutes)
app.use("/api/Bus",BusRoutes)
app.use("/api/BusBookings",BusBookingRoutes)
app.use("/api/SearchRoutes",SearchRoutes )

export {app}


