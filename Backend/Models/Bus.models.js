import mongoose from "mongoose";

const BusSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    BusType:{
        type: String,
        required: true,
    },
    BusNo:{
        type:Number,
        required: true
    },
    departureStation:{
        type: String,
        required: true
    },
    ArrivalStation:{
        type: String,
        required: true
    },
    departureTime:{
        type: String,
        required: true
    },
    ArrivalTime:{
        type: String,
        required: true
    },
    PickupPoint:{
        type: String,
        required: true
    },
    DropPoint:{
        type: String,
        required: true
    },
    Price:{
        class:{
            secondSeating:{
                type:Number,
            },
            sleeperClass:{
                type:Number,
            }
        }
    },
    SeatsAvailable:{
        type:Number,
        required: true
    }
})

export const Bus = mongoose.model("BusSchema",BusSchema)