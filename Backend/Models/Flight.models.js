import mongoose from "mongoose"

const FlightSchema = new mongoose.Schema({
    // title , departure , arrival , departureTime , arrivalTime, FlightNo, PriceStarts 

    title:{
        type: String,
        required: true
    },
    FlightNo:{
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
    PriceStarts:{
        type: String,
        required: true
    },
    //price by class
    class:{
        EconomyPrice:{
            type:Number,
            required: true
        },
        BusinessPrice:{
            type:Number,
            required: true
        },
        PremiumEconomy:{
            type:Number,
            required: true
        },
        FirstClass:{
            type:Number,
            required: true
        }
    },
    
})

export const Flight = mongoose.model('Flight',FlightSchema)