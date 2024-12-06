import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  extraInfo: {
    //- best time to visit,how to reach there,Tips for visiting
    type: String,
    required: true,
  },
});

const PlaceModel = mongoose.model("Place", PlaceSchema);
export default PlaceModel;
