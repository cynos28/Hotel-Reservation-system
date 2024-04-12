const mongoose = require("mongoose");

const Schema = mongoose.Schema; 

const RateSchema = new Schema({
  date: {
    type: String, 
    required: true,
  },
  name: {
    type: String, 
    required: true,
  },
  gmail: {
    type: String, 
    required: true,
  },
  ratestar: {
    type: String, 
    required: true,
  },
  comment: {
    type: String, 
    required: true,
  },
});

module.exports = mongoose.model("Rate", RateSchema); 
