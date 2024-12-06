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

const TrainBookingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        trainNo: {
            type: String,
            required: true,
        },
        trainDetails: {
            trainNumber: {
                type: String,
                required: true,
            },
            trainClass: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true
            },
            seatsAvailable: {
                type: Number,
                required: true
            }
        },
        departureStation: {
            type: String,
            required: true
        },
        arrivalStation: {
            type: String,
            required: true
        },
        departureTime: {
            type: Date,
            required: true
        },
        arrivalTime: {
            type: Date,
            required: true
        },
        Travellerdetails: [TravellerDetailSchema],
        Totalprice: {
            type: Number,
            required: true
        },
        TotalAdults: {
            type: Number,
            required: true
        },
        SelectedAdults: {
            type: Number,
            required: true
        },
        SelectedTrainClass: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    }
);

export const trainBooking = mongoose.model('TrainBooking', TrainBookingSchema);