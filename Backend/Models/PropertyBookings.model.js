import mongoose, { Schema } from 'mongoose';

const PropertybookingSchema = new Schema({

    property:
    {
        type:mongoose.Schema.Types.ObjectId,required:true,ref:'Property'
    },
    user:
    {
        type:mongoose.Schema.Types.ObjectId,required:true,
    },
    checkInDate:
    {
        type:Date,
        required:true
    },
    checkOutDate:
    {
        type:Date,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    phone:
    {
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true // Ensure price is required
    },
    address:{
        type: String,
        required: true
    },
    photos:{
        type: [String],
        required: true
    }
})

const PropertyBookingModel = mongoose.model('PropertyBookings',PropertybookingSchema)

export default PropertyBookingModel;