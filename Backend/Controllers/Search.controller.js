import {hotel} from "../Models/hotels.model.js"
import PlaceModel from "../Models/Place.models.js";
import PropertyModel from "../Models/property.model.js";



//search hotels , places , search accomodation by name

const SearchByName = async (req, res) => {
    const { title } = req.query;
    if (!title) {
        return res.status(400).json({ message: "Please enter a title" });
    }
    try {
        const hotels = await hotel.find({ title });
        const places = await PlaceModel.find({ title });
        const properties = await PropertyModel.find({ title });
        return res.status(200).json({ hotels, places, properties });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "failed to search" });
    }
}

//search suggestions
const SearchSuggestions = async (req, res) => {
    const { query } = req.query; // extract the query parameter
    if (!query) {
        return res.status(400).json({ message: "Please enter a search term" });
    }
    
    try {
        // Use a regex to find titles containing the query string, case-insensitive
        const regex = new RegExp(query, 'i');
        const hotelSuggestions = await hotel.find({ title: regex }).select("title _id"); // Include _id
        const placeSuggestions = await PlaceModel.find({ title: regex }).select("title _id");
        const propertySuggestions = await PropertyModel.find({ title: regex }).select("title _id");
        
        // Combine results from all collections with IDs
        const suggestions = [
            ...hotelSuggestions.map((item) => ({ title: item.title, id: item._id, type: 'hotel' })), // Added type and id
            ...placeSuggestions.map((item) => ({ title: item.title, id: item._id, type: 'place' })), // Added type and id
            ...propertySuggestions.map((item) => ({ title: item.title, id: item._id, type: 'property' })) // Added type and id
        ];

        return res.status(200).json(suggestions);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to retrieve suggestions" });
    }
}


export { SearchByName, SearchSuggestions, };



