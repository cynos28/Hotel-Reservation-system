const Payment = require("../models/paymentModel");

const addPayment = async (req, res, next) => {
  const bookingId = req.params.bookingId;

  console.log("req.body", req.body);
  console.log("req.body?.user", req.params);

  const userId = req.body?.user?.id;
  const userName = req.body?.user?.name;
  const userEmail = req.body?.user?.email;
  const userPhone = req.body?.user?.phone;

  const bookingType = req.body?.booking?.type;
  const bookingAmount = req.body?.booking?.amount;

  const cardId = req.body?.card?.id;

  try {
    const payment = new Payment({
      user: {
        id: userId,
        name: userName,
        email: userEmail,
        phone: userPhone,
      },
      card: {
        id: cardId,
      },
      booking: {
        id: bookingId,
        bookingType: bookingType,
        amount: bookingAmount,
      },
    });
    const result = await payment.save();
    res.status(201).json({
      message: "Payment saved successfully",
      data: {
        paymentId: result._id,
      },
    });
  } catch (error) {
    res.status(404).json({ message: "Payment not saved " + error });
  }
};

const getPayment = async (req, res, next) => {
  try {
    const paymentId = req.params?.id;
    const payment = await Payment.findById(paymentId);

    res
      .status(200)
      .json({ message: "success", data: payment ? payment : null });
  } catch (error) {
    res.status(404).json({ message: "Not found " + error, data: {} });
  }
};

const getAllPaymentsByBookingType = async (req, res, next) => {
  try {
    const bookingType = req.query?.type || "";
    const payments = await Payment.find({
      "booking.bookingType": bookingType,
    });

    res
      .status(200)
      .json({ message: "success", data: payments.length ? payments : [] });
  } catch (error) {
    res.status(404).json({ message: "Not found " + error, data: [] });
  }
};

const deletePayment = async (req, res, next) => {
  try {
    const paymentId = req.params?.id;
    await Payment.findByIdAndDelete(paymentId);

    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Not found " + error });
  }
};

exports.addPayment = addPayment;
exports.getPayment = getPayment;

exports.getAllPaymentsByBookingType = getAllPaymentsByBookingType;
exports.deletePayment = deletePayment;
