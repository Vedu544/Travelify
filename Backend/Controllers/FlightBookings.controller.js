import { Flight } from "../Models/Flight.models.js";
import { FlightBookings } from "../Models/FlightBookings.model.js";
import jwt from "jsonwebtoken";
import Stripe from "stripe"
//get details of flight by deaparture station and arrival station

async function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    const { jwt: token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, userData) => {
      if (err) reject(err);
      else resolve(userData);
    });
  });
}

//get flight details by FlightNo
const getFlightDetails = async (req, res) => {
  try {
    const getFlight = await Flight.findOne({ FlightNo: req.params.FlightNo }); // Pass an object with the field name
    console.log(getFlight);
    res.status(200).json(getFlight);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get flight details" });
  }
};

const BookFlight = async (req, res) => {
  const { FlightNo } = req.params;

  console.log(FlightNo);
  try {
    const userData = await getUserDataFromReq(req);

    const {
      title,
      FlightNo,
      DepartureStation,
      ArrivalStation,
      departureTime,
      ArrivalTime,
      Price,
      TravellerDetails,
      SelectedClass,
      SelectedAdults,
      TotalPrice,
    } = req.body;

    console.log(req.body);

    if (
      !title ||
      !FlightNo ||
      !DepartureStation ||
      !ArrivalStation ||
      !departureTime ||
      !ArrivalTime ||
      !Price ||
      !TravellerDetails ||
      !SelectedClass ||
      !SelectedAdults ||
      !TotalPrice
    ) {
      return res
        .status(400)
        .json({ message: "All Flight booking details are required" });
    }

    const existingFlight = await Flight.findOne({ FlightNo });
    if (!existingFlight) {
      return res.status(404).json({ message: "Flight not found" });
    }


    const newBooking = await FlightBookings.create({
      title,
      FlightNo,
      DepartureStation,
      ArrivalStation,
      departureTime,
      ArrivalTime,
      Price,
      TravellerDetails,
      user: userData.userId,
      SelectedClass,
      SelectedAdults,
      TotalPrice,
    });

    await newBooking.save();
    res.status(200).json({ message: "flight booked successfully" });
  } catch (error) {
    console.log(error);
    if (!res.headersSent) {
      res.status(500).json({ message: "failed to book", error });
    }
  }
};

const getMyFlightBookings = async (req, res) => {
  const { id } = req.params;
  try {
    const myBookings = await FlightBookings.find({ user: id });
    console.log(myBookings);
    res.status(200).json(myBookings);
  } catch (error) {
    res.status(500).json({ message: "failed to fetch your bookings", error });
  }
};

const cancelFlightBookings = async (req, res) => {
  const { id } = req.params;
  console.log(req.params)
  try {
    const booking = await FlightBookings.findOneAndDelete({ user: id });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "failed to cancel booking", error });
  }
}




export { BookFlight, getFlightDetails, getMyFlightBookings, cancelFlightBookings } 
