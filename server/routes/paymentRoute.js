const express = require("express");
const router = express.Router({ mergeParams: true });
const PaymentController = require("../controllers/paymentController");

router.post("/", PaymentController.addPayment);
router.get("/:id", PaymentController.getPayment);

// for Admin
router.get("/", PaymentController.getAllPaymentsByBookingType);
router.delete("/:id", PaymentController.deletePayment);

module.exports = router;
