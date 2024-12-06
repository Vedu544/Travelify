import mongoose from "mongoose";

const TrainSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    trainNo: {
      type: String,
      required: true,
    },
    trainDetails: [
      {
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
          required: true,
        },
        seatsAvailable: {
          type: Number,
          required: true,
        },
      },
    ],
    departureStation: {
      type: String,
      required: true,
    },
    arrivalStation: {
      type: String,
      required: true,
    },
    departureTime: {
      type: Date,
      required: true,
    },
    arrivalTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Train = mongoose.model("Train", TrainSchema);