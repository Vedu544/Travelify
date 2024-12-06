import PropertyBookingModel from "../Models/PropertyBookings.model.js";
import {errorHandler} from "../Utillis/error.js"
import jwt from "jsonwebtoken"

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    const { jwt: token } = req.cookies;
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      {},
      async (err, userData) => {
        if (err) {
          reject(err);
          return ;
        }
        resolve(userData);
      }
    );
  });
}

const PropertyBookings = async (req, res) => {
  console.log("PropertyBookings")
  const userData = await getUserDataFromReq(req);
  const { accommodationId } = req.params; // Extract accommodation ID from params
  try {
    const {
      checkInDate,
      checkOutDate,
      name,
      phone,
      email,
      address,
      photos,
      totalPrice // Add totalPrice to handle the new field
    } = req.body;

  console.log(req.body);
    const existingBookings = await PropertyBookingModel.find({
      property: accommodationId, // Use accommodationId from params
      $or: [
        { checkInDate: { $lt: checkOutDate, $gte: checkInDate } },
        { checkOutDate: { $gt: checkInDate, $lte: checkOutDate } }
      ]
    });

    if (existingBookings.length > 0) {
      return res.status(400).json({ message: "Property already booked on these dates" });
    }

    PropertyBookingModel.create({
      property: accommodationId, // Use accommodationId from params
      checkInDate,
      checkOutDate,
      price: totalPrice, // Use totalPrice from frontend
      name,
      phone,
      email,
      address,
      photos,
      user: userData.userId,
    })
      .then((Bookingdoc) => {
        res.status(200).json({ message: "Booking done", Bookingdoc });
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    res.status(500).json(errorHandler(500, "Failed to create bookings", error));
  }
};

const getMyPropertyBookings = async(req,res)=>{
  const {id} = req.params
  try {
    res.json(await PropertyBookingModel.find({user:id}).populate('property'))
  } catch (error) {
    res.status(500).json(errorHandler(500,"failed to get your property bookings", error))
  }
}

const cancelBookings = async(req, res) => {
  const { id } = req.params;
  try {
    const cancel = await PropertyBookingModel.findOneAndDelete({ user: id });
    if (!cancel) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Booking cancelled", cancel });
  } catch (error) {
    res.status(500).json(errorHandler(500, "Failed to cancel booking", error));
  }
}

export {PropertyBookings,getMyPropertyBookings,cancelBookings}
