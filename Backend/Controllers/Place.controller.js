import PlaceModel from "../Models/Place.models.js";
import { errorHandler } from "../Utillis/error.js";


//create a new place - by admin user
const createPlace = async(req,res)=>{ 
    try { 
        const newPlace = new PlaceModel(req.body) 
        const savedPlace = await newPlace.save() 
        res.status(201).json({message:"place created", place: savedPlace}) // Updated to include savedPlace in the response
    } catch (error) { 
        res.status(500).json(errorHandler(error), {message:"error saving place"}) // Fixed errorHandler usage
    } 
}

//update place- by admin user
const updatePlace = async(req,res)=>{
    try {
        const updatedplace = await PlaceModel.findByIdAndUpdate(
            req.params.id,
            { $set:req.body},
            {new:true}
        )
        res.status(200).json({message:"succesfully updated",place:updatedplace})
    } catch (error) {
        res.status(500).json(errorHandler(500, error.message));
        
    }
}


//delete place - by admin user
const deletePlace = async(req,res)=>{
    try {
        const deletedPlace = await PlaceModel.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"place deleted",deletedPlace});
    } catch (error) {
        res.status(500).json(errorHandler(500, error.message));
    }
}

//get place by id - by user
const getPlace = async(req,res)=>{
    try {
        const ShowPlace = await PlaceModel.findById(req.params.id)
        res.status(200).json(ShowPlace)
    } catch (error) {
        res.status(500).json(errorHandler(500, error.message));
    }
}

//get places- by user
const getPlaces = async(req,res)=>{
    try {
        const ShowPlaces = await PlaceModel.find()
        res.status(200).json(ShowPlaces)
    } catch (error) {
        res.status(500).json(errorHandler(500, error.message));
    }
}

//get places by cities
const getPlacesByCity = async(req,res)=>{
    console.log(req.params.city)
    try {
        const placeByCity  = await PlaceModel.find({ City: req.params.city})
        res.status(200).json(placeByCity)
    } catch (error) {
        res.status(500).json(errorHandler(500, error.message));
    }
}

export {createPlace,updatePlace,deletePlace,getPlace,getPlaces,getPlacesByCity} 
