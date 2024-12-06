import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
    },
    desc: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
      required: true,
    },
    roomNumbers: {
      type: [{ number: Number, unavailableDates: { type: [Date] } }],
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hotel",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
export const room = mongoose.model("Room", roomSchema);
export default room;
