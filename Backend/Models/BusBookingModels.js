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

const BusBookings = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    BusNo: {
        type: Number,
        required: true,
    },
    departureStation: {
        type: String,
        required: true,
    },
    ArrivalStation: {
        type: String,
        required: true,
    },
    departureTime: {
        type: String,
        required: true,
    },
    ArrivalTime: {
        type: String,
        required: true,
    },
    Price: {
        class: {
            secondSeating: {
                type: Number,
            },
            sleeperClass: {
                type: Number,
            },
        },
    },
    SeatsAvailable: {
        type: Number,
        required: true,
    },
    TravellerDetails: [TravellerDetailSchema], // Change to an array of TravellerDetailSchema
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

export const BusBooking = mongoose.model('BusBooking', BusBookings);
