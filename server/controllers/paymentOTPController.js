const PaymentOTP = require("../models/paymentOTPModel");
const otpGenerator = require("otp-generator");

const sendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await PaymentOTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await PaymentOTP.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    await PaymentOTP.create(otpPayload);
    res.status(201).json({ message: "OTP sent", otp: otp });
  } catch (error) {
    res.status(404).json({ message: "OTP Error " + error });
  }
};
exports.sendOTP = sendOTP;
