const express = require("express");
const router = express.Router();
const Booking = require("..//models/BookingModel");
const bookingController = require("../controllers/BookingController.js");

router.get("/", bookingController.getAllBookings);
router.post("/", bookingController.addBooking);
router.get("/:id", bookingController.getBookingById);
router.put("/:id", bookingController.updateBooking );
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;