import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room',
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        checkIn: {
            type: Date,
            required: true
        },
        checkOut: {
            type: Date,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        },
        category:{
            type: String,
            required: true
        },
        address:{
            type: String,
            required: true
        },
        RoomNumber:{
            type: String,
            required: true
        },
        photos:{
            type: [String],
            required: true
        }

    },
    {
        timestamps: true
    }
);

export const booking = mongoose.model("Booking", bookingSchema);
export default booking;