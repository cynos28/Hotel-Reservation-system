const mongoose = require('mongoose');
const Schema = mongoose.Schema

const eventSchema = new Schema({
    userId: {
      type: String,
    },
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    date: {
      type: Date,
    },
    cap: {
      type: Number,
    },
    etype: {
      type: String,
      default: "Personal"
    },
    venue: {
      type: String,
    },
    estatus: {
      type: String,
      default: "Pending"
    },
    sTime: {
      type: String,
    },
    eTime: {
      type: String,
    },    
    photo: {
      type: String,
    },
    cost: {
      type: String,
      default: "-1"
    },
    description: {
      type: String,
      default: "Ok"
    }
   
  },{timestamps: true})

module.exports = mongoose.model('Events',eventSchema)