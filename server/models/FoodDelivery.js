const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const deliverySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Delivery", deliverySchema);
