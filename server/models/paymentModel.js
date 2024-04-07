const mongoose = require("mongoose"); 

const Schema = mongoose.Schema; 

const PaymentSchema = new Schema({
  //User Details
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
  //card details
  cardno: {
    type: String, //type
    required: true,
  },
  cardname: {
    type: String, //type
    required: true,
  },
  expdate: {
    type: String, //type
    required: true,
  },
  cvv: {
    type: String, //type
    required: true,
  },
  payid: {
    type: String, //type
    required: true,
  },
  type: {
    type: String, //type
    required: true,
  },
  amount: {
    type: String, //type
    required: true,
  },
});

module.exports = mongoose.model("Payment", PaymentSchema); 
