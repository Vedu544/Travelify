import mongoose from 'mongoose'

const propertySchema  = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    photos:{
        type: [String],
        required: true
    },
    description:{
        type: String,
        required: true
    },
    perks:{
        type: [String]
    },
    extraInfo:{
        type: String,
        required: true
    },
    maxGuests:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },

})

const PropertyModel = mongoose.model('Property', propertySchema)
export default PropertyModel
