const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  name: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Food", foodSchema);
