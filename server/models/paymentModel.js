const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  user: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  booking: {
    id: {
      type: String,
      required: true,
    },
    bookingType: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
  },
  card: {
    id: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("Payment", PaymentSchema);
