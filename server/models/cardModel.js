const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cardSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  cardNo: {
    type: String, //type
    required: true,
  },
  cardName: {
    type: String, //type
    required: true,
  },
  expDate: {
    type: String, //type
    required: true,
  },
  cvv: {
    type: String, //type
    required: true,
  },
});

module.exports = mongoose.model("Card", cardSchema);
