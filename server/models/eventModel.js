const mongoose = require('mongoose');
const Schema = mongoose.Schema

const eventSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    cap:{
        type: Number,
        required: true
    },
    date:{
        type: Date,  
        required: true
    },
    desc:{
        type: String,
        default: "null",
    },
    etype:{
        type: String,
        required: true
    },
    venue:{
        type: String,
        required: true
    },
    estatus:{
        type: String,
        default: "Pending",
    },
    reason:{
        type: String,
        default: "ok",
    }//duration,uId,photo
},{timestamps: true})

module.exports = mongoose.model('Event',eventSchema)