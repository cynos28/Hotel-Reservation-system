const express = require("express");
const router = express.Router({ mergeParams: true });
const PaymentOTPController = require("../controllers/paymentOTPController");

router.post("/", PaymentOTPController.sendOTP);

module.exports = router;
