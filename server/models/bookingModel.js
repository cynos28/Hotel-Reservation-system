
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  adults: {
    type: Number,
    required: true,
  },
  kids: {
    type: Number,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  request: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);