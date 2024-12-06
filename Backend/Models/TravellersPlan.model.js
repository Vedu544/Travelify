import mongoose from "mongoose";

const travelPlanSchema = new mongoose.Schema({
  destination:{type:String,required:true},
  destination_id: { type: String, required: true }, // Updated field name
  places_covered: [{ type: String, required: true }], // Updated field name
  available_trains: [{ type: String, required: true }], // Updated field name
  available_buses: [{ type: String, required: true }], // Updated field name
  approx_charges: { // Updated field name
    train: {
      food: { type: { min: Number, max: Number }, required: true },
      transportation: { type: { min: Number, max: Number }, required: true },
      stay: { type: { min: Number, max: Number }, required: true },
      entry_fees: { type: { min: Number, max: Number }, required: true },
      total: { type: { min: Number, max: Number }, required: true },
    },
    bus: {
      food: { type: { min: Number, max: Number }, required: true },
      transportation: { type: { min: Number, max: Number }, required: true },
      stay: { type: { min: Number, max: Number }, required: true },
      entry_fees: { type: { min: Number, max: Number }, required: true },
      total: { type: { min: Number, max: Number }, required: true },
    },
  },
});

const TravelPlanModel = mongoose.model("TravelPlan", travelPlanSchema);
export default TravelPlanModel;