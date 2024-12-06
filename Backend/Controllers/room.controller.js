import { errorHandler } from "../Utillis/error.js";
import room from "../Models/Room.model.js";
import hotel from "../Models/hotels.model.js";
import jwt from "jsonwebtoken";
import Booking from "../Models/Booking.model.js"; // Import the Booking model

//create room- only admin
const createRoom = async (req, res) => {
  const hotelId = req.params.hotelid;
  const newRoom = new room({
    ...req.body,
    hotel: hotelId, // Add hotel ID to the room data
  });

  try {
    const savedRoom = await newRoom.save();
    try {
      await hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      res.status(500).json(errorHandler(500, error.message));
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    res.status(500).json(errorHandler(500, error.message));
  }
};

//update room- only admin
const updateRoom = async (req, res) => {
  const roomId = req.params.roomid;
  console.log(roomId);
  try {
    const updatedRoom = await room.findByIdAndUpdate(
      roomId,
      { $set: req.body },
      { new: true }
    );
    if (!updatedRoom) {
      return res.status(404).json(errorHandler(404, "room not found")); // Use return to prevent further execution
    }
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json(errorHandler(500, error.message));
  }
};

//book room by user

const bookRoom = async (req, res) => {
  console.log("Book Room");
  const roomId = req.params.roomid;
  console.log(roomId);
  const userData = await getUserDataFromReq(req);
  const userId = userData.userId;
  const { checkIn, checkOut, username, email, phoneNumber, totalPrice, RoomNumber, category, address, photos } = req.body; 

  console.log(req.body);
  // Validate required fields
  if (
    !checkIn ||
    !checkOut ||
    !username ||
    !email ||
    !phoneNumber ||
    !RoomNumber ||
    !category ||
    !address ||
    !photos === undefined ||
    !totalPrice 
  ) {
    return res
      .status(400)
      .json({
        message:
          "All fields are required",
      });
  }

  // Validate and parse dates
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  if (isNaN(checkInDate) || isNaN(checkOutDate)) {
    return res
      .status(400)
      .json({ message: "Invalid check-in or check-out date." });
  }

  console.log(checkInDate,checkOutDate);

  try {
    const roomToUpdate = await room.findById(roomId);
    if (!roomToUpdate) {
      return res.status(404).json(errorHandler(404, "room not found"));
    }

  

    // Check for existing bookings
    const isBooked = roomToUpdate.roomNumbers.some((roomNumber) =>
      roomNumber.unavailableDates.some(
        (date) =>
          new Date(date) >= checkInDate && new Date(date) <= checkOutDate
      )
    );

    if (isBooked) {
      return res
        .status(400)
        .json({ message: "Room is already booked for the selected dates." });
    }

    // Proceed to book the room
    roomToUpdate.roomNumbers.forEach((roomNumber) => {
      roomNumber.unavailableDates.push(
        checkInDate.toISOString(),
        checkOutDate.toISOString()
      );
    });

    // Create a new booking
    const newBooking = new Booking({
      room: roomId,
      user: userId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      user: userData.userId,
      RoomNumber,
      category,
      address,
      photos, 

      username,
      email,
      phoneNumber,
      totalPrice, // Use the totalPrice from the request
    });

    await newBooking.save(); // Save the booking details

    const updatedRoom = await roomToUpdate.save(); // Save the updated room
    res.status(200).json({ message: "Room booked successfully.", updatedRoom });
  } catch (error) {
    console.error("Error booking room:", error); // Log the error details
    res.status(500).json(errorHandler(500, error.message));
  }
};

// delete room - only admin
const deleteRoom = async (req, res) => {
  console.log("Room deleted")
  const hotelId = req.params.hotelId;
  try {
    await room.findByIdAndDelete(req.params.id); // Fixed typo: findyBIdAndDelete to findByIdAndDelete
    await hotel.findByIdAndUpdate(hotelId, {
      $pull: { rooms: req.params.id },
    });
    res.status(200).json("room has been deleted");
  } catch (error) {
    res.status(500).json(errorHandler(500, error.message));
  }
};

//get room - by id - by user
const getRoom = async (req, res) => {
  try {
    const roomData = await room.findById(req.params.roomid);
    if (!roomData) {
      return res.status(404).json(errorHandler(404, "room not found"));
    }

    // Validate unavailableDates
    roomData.roomNumbers.forEach((roomNumber) => {
      roomNumber.unavailableDates = roomNumber.unavailableDates.filter(
        (date) => !isNaN(new Date(date))
      );
    });

    res.status(200).json(roomData);
  } catch (error) {
    res.status(500).json(errorHandler(500, error.message));
  }
};

//get rooms-by id-by user
const getRooms = async (req, res) => {
  try {
    const getRooms = await room.find();
    res.status(200).json(getRooms);
  } catch (error) {
    res.status(500).json(errorHandler(500, error.message));
  }
};

//get room bookings - by user
function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    const { jwt: token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(userData);
    });
  });
}

const roomBookings = async (req, res) => {
  console.log('Room bookings');
  const { id } = req.params;
  console.log(id);

  try {
    // Fetch rooms booked by the user
    const bookedRooms = await Booking.find({ user: id }).populate("room"); // Ensure "room" is the correct field to populate
    res.status(200).json(bookedRooms); // Return the booked rooms
  } catch (error) {
    console.error("Error fetching room bookings:", error); // Log the error details
    res
      .status(500)
      .json(errorHandler(500, "failed to get your room bookings", error));
  }
};

const cancelRoomBookings = async (req, res) => {
  console.log('Cancel room bookings');
  const { id } = req.params;
  try {
    const cancel = await Booking.findOneAndDelete({ user: id }); 
    if (!cancel) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Booking cancelled", cancel });
  } catch (error) {
    res.status(500).json(errorHandler(500, "Failed to cancel booking", error));
  }
}

export {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getRooms,
  bookRoom,
  roomBookings,
  cancelRoomBookings
};
