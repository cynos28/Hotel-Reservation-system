//Data type for create data base

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExtraSchema = new Schema({
  name: {
    type: String, //type
    required: true,
  },
  gmail: {
    type: String, //type
    required: true,
  },
  phone: {
    type: String, //type
    required: true,
  },

  gym: {
    type: String, //type
  },
  pool: {
    type: String, //type
  },
  bar: {
    type: String, //type
  },
  spa: {
    type: String, //type
  },
  vehicle: {
    type: String, //type
  },
  dayplan: {
    type: String, //type
  },
  specialday: {
    type: String, //type
  },
  petfriend: {
    type: String, //type
  },

  total: {
    type: String, //type
    required: true,
  },
  extraid: {
    type: String, //type
    required: true,
  },
});

module.exports = mongoose.model("Extra", ExtraSchema);
