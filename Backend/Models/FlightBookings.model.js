import mongoose from "mongoose";


const TravellerDetailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    nationality: {
        type: String,
        required: true,
    },
    berthPreference: {
        type: String,
        required: true,
    },
});

const FlightBookingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    FlightNo: {
        type: Number,
        required: true
    },
    DepartureStation: {
        type: String,
        required: true
    },
    ArrivalStation: {
        type: String,
        required: true
    },
    departureTime: {
        type: String,
        required: true
    },
    ArrivalTime: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    SelectedClass:{
        type: String,
        required: true
    },
    SelectedAdults:{
        type: Number,
        required: true
    },
    TotalPrice:{
        type: Number,
        required: true
    },
    TravellerDetails: [TravellerDetailSchema],
    user:
    {
        type:mongoose.Schema.Types.ObjectId,required:true,
    },
});

export const FlightBookings = mongoose.model("FlightBooking", FlightBookingSchema);
