import { trainBooking } from "../Models/TrainBookings.model.js";
import jwt from "jsonwebtoken";
import { Train } from "../Models/Train.model.js";

// Function to extract user data from request
async function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    const { jwt: token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, userData) => {
      if (err) reject(err);
      else resolve(userData);
    });
  });
}

// Function to handle train booking
// Function to handle train booking
const bookTrain = async (req, res) => {
  // console.log("Request body:", req.body);
  const { trainNo } = req.params;

  try {
    const userData = await getUserDataFromReq(req);
    // console.log("User data:", userData);

    const {
      name,
      trainNo,
      trainDetails,
      departureStation,
      arrivalStation,
      departureTime,
      arrivalTime,
      Travellerdetails,
      Totalprice,
      TotalAdults,
      SelectedAdults,
      SelectedTrainClass,
    } = req.body;

    // console.log("Requestbody", req.body)
    // Validate required fields
    if (
      !name ||
      !trainNo ||
      !trainDetails.trainNumber ||
      !trainDetails.trainClass ||
      !trainDetails.price ||
      !departureStation ||
      !arrivalStation ||
      !departureTime ||
      !arrivalTime ||
      !Travellerdetails ||
      !Totalprice ||
      !TotalAdults ||
      !SelectedAdults ||
      !SelectedTrainClass
    ) {
      return res
        .status(400)
        .json({ message: "All train booking details are required" });
    }

    // First, check if the train exists
    const existingTrain = await Train.findOne({ trainNo });
    // console.log("Existing train found:", existingTrain); // Log the existing train
    if (!existingTrain) {
      return res.status(404).json({ message: "Train not found" });
    }

    // Ensure trainDetails is an array
    if (!Array.isArray(existingTrain.trainDetails)) {
      return res
        .status(500)
        .json({ message: "Train details format is invalid" });
    }

    // Find the specific class in train details
    const selectedClassDetail = existingTrain.trainDetails.find(
      (detail) => detail.trainClass === SelectedTrainClass
    );
    if (!selectedClassDetail) {
      return res
        .status(404)
        .json({ message: "Selected train class not found" });
    }

    // Ensure there are enough seats available
    if (selectedClassDetail.seatsAvailable < SelectedAdults) {
      return res
        .status(400)
        .json({ message: "Not enough seats available in the selected class" });
    }

    // Create the booking
    const newBooking = await trainBooking.create({
      name,
      trainNo,
      trainDetails: {
        trainNumber: trainDetails.trainNumber,
        trainClass: SelectedTrainClass,
        price: Number(trainDetails.price),
        seatsAvailable: selectedClassDetail.seatsAvailable - SelectedAdults,
      },
      departureStation,
      arrivalStation,
      departureTime,
      arrivalTime,
      Travellerdetails,
      Totalprice,
      TotalAdults,
      SelectedAdults,
      SelectedTrainClass,
      user: userData.userId,
    });

    console.log("newBooking", newBooking);
    // Update seats available for the selected class
    selectedClassDetail.seatsAvailable -= SelectedAdults;
    await existingTrain.save();

    res.status(200).json({ message: "Booking done", BookingTrain: newBooking });
  } catch (error) {
    console.log(error);
    console.error("Error booking train:", error);

    res
      .status(500)
      .json({ message: "Failed to book train", error: error.message });
  }
};

const getTrainDetails = async (req, res) => {
  console.log("Getting train details");
  try {
    const getTrain = await Train.findOne({ trainNo: req.params.trainNo }); // Pass an object with the field name
    console.log(getTrain);
    res.status(200).json(getTrain);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get flight details" });
  }
};

const getMyTrainBookings = async (req, res) => {
  const { id } = req.params;
  try {
    const myBookings = await trainBooking.findOne({ user: id });
    res.status(200).json(myBookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Bus bookings" });
  }
};



const cancelBookings = async (req, res) => {
  console.log("Canceling bookings");
  const { id } = req.params; // User ID passed as a parameter
  console.log(id)

  try {
    // Step 1: Fetch all bookings for the user
    const bookings = await trainBooking.find({ user: id });
    console.log(bookings)
    if (!bookings.length) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user" });
    }

    // Step 2: Process each booking
    for (const booking of bookings) {
      // Identify selected train class and number of adults
      const { SelectedTrainClass, TotalAdults, trainNo } = booking;
      // console.log("booking",booking)

      // Step 3: Find the corresponding train
      const train = await Train.findOne({ trainNo: trainNo });
      // console.log("train" , train);
      if (!train) {
        return res.status(404).json({ message: "Train not found" });
      }
      // console.log(train);
      // Step 4: Update seats available for the selected train class
      const trainDetail = train.trainDetails.find(
        (detail) => detail.trainClass === SelectedTrainClass
      );
      if (trainDetail) {
        // Increase available seats
        trainDetail.seatsAvailable += TotalAdults;

        // Save updated train document
        await train.save();
      } else {
        return res
          .status(404)
          .json({ message: "Selected train class not found" });
      }

      // Step 5: Delete or mark the booking as canceled
      await trainBooking.findOneAndDelete({ user: id });
    }

    res
      .status(200)
      .json({ message: "All bookings canceled successfully, seats updated." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to cancel bookings" });
  }
};

export { bookTrain, getTrainDetails, getMyTrainBookings, cancelBookings };
