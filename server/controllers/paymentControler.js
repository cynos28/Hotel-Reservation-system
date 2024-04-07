const Payment = require("../models/paymentModel");

const getAllPayment = async (req, res, next) => {
  let payment;
  // Get all payment
  try {
    payment = await Payment.find();
  } catch (err) {
    console.log(err);
  }
  // not found
  if (!payment) {
    return res.status(404).json({ message: "Payment not found" });
  }
  // Display all payment
  return res.status(200).json({ payment });
};

// data Insert
const addPayment = async (req, res, next) => {
  const {
    name,
    gmail,
    phone,
    cardno,
    cardname,
    expdate,
    cvv,
    payid,
    type,
    amount,
  } = req.body;

  let payment;

  try {
    payment = new Payment({
      name,
      gmail,
      phone,
      cardno,
      cardname,
      expdate,
      cvv,
      payid,
      type,
      amount,
    });
    await payment.save();
  } catch (err) {
    console.log(err);
  }
  // not insert payments
  if (!payment) {
    return res.status(404).json({ message: "unable to add Payment" });
  }
  return res.status(200).json({ payment });
};

//Get by Id
const getById = async (req, res, next) => {
  const id = req.params.id;

  let payment;

  try {
    payment = await Payment.findById(id);
  } catch (err) {
    console.log(err);
  }
  // not available payments
  if (!payment) {
    return res.status(404).json({ message: "payment Not Found" });
  }
  return res.status(200).json({ payment });
};

//Update payment Details
const updatePayment = async (req, res, next) => {
  const id = req.params.id;
  const {
    name,
    gmail,
    phone,
    cardno,
    cardname,
    expdate,
    cvv,
    payid,
    type,
    amount,
  } = req.body;

  let payment;

  try {
    payment = await Payment.findByIdAndUpdate(id, {
      name: name,
      gmail: gmail,
      cardno: cardno,
      cardname: cardname,
      expdate: expdate,
      cvv: cvv,
      payid: payid,
      type: type,
      amount: amount,
    });
    payment = await payments.save();
  } catch (err) {
    console.log(err);
  }
  if (!payment) {
    return res
      .status(404)
      .json({ message: "Unable to Update payment Details" });
  }
  return res.status(200).json({ payment });
};

//Delete payment Details
const deletePayment = async (req, res, next) => {
  const id = req.params.id;

  let payment;

  try {
    payment = await Payment.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!payment) {
    return res
      .status(404)
      .json({ message: "Unable to Delete Payment Details" });
  }
  return res.status(200).json({ payment });
};


const getByPayId = async (req, res) => {
  try {
    const { payId } = req.params;

    // Fetch payment details from the database based on the payment ID
    const payment = await Payment.findOne({ payid:payId });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // If the payment is found, return it in the response
    res.status(200).json({ payment });
  } catch (error) {
    console.error("Error fetching payment details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getAllPayment = getAllPayment;
exports.addPayment = addPayment;
exports.getById = getById;
exports.getByPayId = getByPayId;
exports.updatePayment = updatePayment;
exports.deletePayment = deletePayment;
