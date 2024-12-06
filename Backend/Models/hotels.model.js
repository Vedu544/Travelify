import mongoose from "mongoose";


const priceRangeSchema = new mongoose.Schema(
    {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    { _id: false } 
);

const hotelSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        photos:{
            type:[String],
        },
        priceRange: {
            type: priceRangeSchema,
            required: true
        },
        featured:{
            type:Boolean,
            default:false
        },
        rooms: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room'
        }],
       
            
}
)

export const hotel = mongoose.model("hotel",hotelSchema)
export default hotel
