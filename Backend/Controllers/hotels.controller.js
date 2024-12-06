import {hotel} from "../Models/hotels.model.js"
import { errorHandler } from "../Utillis/error.js"

//create hotel - admin user
const createHotel = async(req,res)=>{
    
    // console.log(req.body)
    const newHotel = new hotel(req.body)
    if(!newHotel){
        res.status(400).json({message:"error while creating hotel"})
    }

    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        res.status(500).json(errorHandler(500, error.message));
    }
}   

//update hotel - admin user
const updateHotel = async(req,res)=>{
    try {
        const updatedHotel  = await hotel.findByIdAndUpdate(
            req.params.id,
            { $set:req.body},
            {new:true}
        )
        res.status(200).json(updatedHotel)
    } catch (error) {
        res.status(500).json(errorHandler(500, error.message));
    }
}

//delete hotel - admin user
const deleteHotel = async(req,res)=>{
    try {
        const deletedHotel = await hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("hotel has been deleted")
    } catch (error) {
        res.status(500).json(errorHandler(500, error.message));
    }
}


//get hotels - any user
const getHotels = async(req,res)=>{
    try {
        const getHotels = await hotel.find()
        res.status(200).json(getHotels)
    } catch (error) {
        res.status(500).json(errorHandler(500, error.message));
    }
}

//get hotel by id - any user
const getHotel = async(req,res)=>{
    try {
        const getHotel = await hotel.findById(req.params.id).populate({
            path: 'rooms',
            model: 'Room' // Ensure this matches your room model name
        });
        res.status(200).json(getHotel)
    } catch (error) {
        res.status(500).json(errorHandler(500, error.message));
    }
}

//get hotel by city - any user
const getHotelByCity = async(req,res)=>{
    try {
        const hotelsByCity = await hotel.find({ city: req.params.city });
        res.status(200).json(hotelsByCity);
    } catch (error) {
        res.status(500).json(errorHandler(500, error.message));
    }
}


const getHotelWithRooms = async (req, res) => {
    try {
      const foundHotel = await hotel.findById(req.params.id).populate('rooms');
      if (!foundHotel) {
        return res.status(404).json(errorHandler(404, 'Hotel not found'));
      }
      res.status(200).json(foundHotel);
    } catch (error) {
      res.status(500).json(errorHandler(500, error.message));
    }
};


export {createHotel,updateHotel,deleteHotel,getHotels,getHotel,getHotelByCity,getHotelWithRooms}