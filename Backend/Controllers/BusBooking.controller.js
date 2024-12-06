import {BusBooking } from "../Models/BusBookingModels.js";
import jwt from "jsonwebtoken";
import { Bus } from "../Models/Bus.models.js";

// Create a new bus booking

async function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    const { jwt: token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, userData) => {
      if (err) reject(err);
      else resolve(userData);
    });
  });
}

const bookBus = async (req, res) => {
  const { BusNo } = req.params;

  console.log("Received BusNo:", BusNo); // Log the received BusNo

  try {
    const userData = await getUserDataFromReq(req);

    const {
        title,
        BusNo,
        departureStation,
        ArrivalStation,
        departureTime,
        ArrivalTime,
        Price,
        SeatsAvailable,
        TravellerDetails,
        PickupPoint,
        DropPoint,
        BusType
    } = req.body;

    console.log("Request Body:", req.body); // Log the request body

    if(!title || !BusNo || !departureStation || !ArrivalStation || !ArrivalTime || !Price || !SeatsAvailable || !TravellerDetails || !PickupPoint || !DropPoint || !BusType){
        return res.status(400).json({message: "All bus booking details are required"});
    }

    const existingBus = await Bus.findOne({ BusNo });
    console.log("Existing Bus:", existingBus); // Log the found bus

    if (!existingBus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    console.log("Bus found", existingBus)

    const newBusBooking = await BusBooking.create({
        title,
        BusNo,
        departureStation,
        ArrivalStation,
        departureTime,
        ArrivalTime,
        Price,
        SeatsAvailable,
        TravellerDetails,
        PickupPoint,
        DropPoint,
        BusType,
        user: userData.userId
    })

    await newBusBooking.save()
    // Update the bus's available seats
    existingBus.SeatsAvailable = existingBus.SeatsAvailable - 1;
    await existingBus.save();
    res.status(200).json({ message: "Bus book successfully" });

  } catch (error) {
    console.error("Error booking bus:", error);
    res.status(500).json({ message: "failed to book a bus" });
  }
};

const getBus  = async (req,res)=>{
  try {
    const getbus = await Bus.findOne({ BusNo : req.params.BusNo})
    res.status(200).json(getbus)
  } catch (error) {
    res.status(500).json({message :"Bus not found"})
  }
}

const getMyBusBookings = async (req,res)=>{
  console.log("Getting bus")
  const {id} = req.params
  try {
   const myBusBookings = await BusBooking.find({user:id}) 
   res.status(200).json(myBusBookings)
  } catch (error) {
    res.status(500).json({message :"Failed to fetch bookings"})
  }
}

const cancelBookings = async (req, res) => {
  const { id } = req.params; // User ID
  try {
    // Find all bookings for the user
    const bookingsToCancel = await BusBooking.find({ user: id });
    if (bookingsToCancel.length === 0) {
      return res.status(404).json({ message: "Bookings not found" });
    }

    // Delete all bookings for the user
    await BusBooking.deleteMany({ user: id });

    // Update the available seats for each bus associated with the bookings
    for (const booking of bookingsToCancel) {
      const bus = await Bus.findOne({ BusNo: booking.BusNo }); // Get BusNo from the booking
      if (bus) {
        bus.SeatsAvailable = bus.SeatsAvailable + 1; // Increment available seats
        await bus.save(); // Save the updated bus
      }
    }

    res.status(200).json({ message: "Bookings cancelled" });
    // Update the bus's available seats

  } catch (error) {
    res.status(500).json({ message: "Failed to cancel bookings" });
  }
}


export { bookBus , getBus, getMyBusBookings, cancelBookings};
