const mongoose = require('mongoose');
const Schema = mongoose.Schema

const eventSchema = new Schema({
    userId:{
        type: String,
        required: true
    },
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
        default: "Personal",
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
    },
    photo:{
        type: String,
    },
    sTime:{
        type: String,
        required: true
    },
    eTime:{
        type: String,
        required: true
    },
    cost:{
        type: Number,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('Event',eventSchema)