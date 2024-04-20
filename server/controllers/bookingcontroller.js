const Booking = require("../models/BookingModel");

const getAllBookings = async (req, res, next) => {
  let bookings;
  try {
    bookings= await Booking.find();
  } catch (err) {
    console.log(err);
  }

  if (!bookings|| bookings.length === 0) {
    return res.status(404).json({ message: "No Bookings found" });
  }
  return res.status(200).json({ bookings });
};

const getBookingById = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Booking.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }
  return res.status(200).json({ booking});
};

const addBooking = async (req, res, next) => {
  const { name, email, address, city, code, phone, adults, kids, room,nights, request,payment} = req.body;
  let newBooking;
  try {
    newBooking = new Booking({
      name,
      email,
      address,
      city,
      code,
      phone,
      adults,
      kids,
      room,
      nights,
      request,
      payment ,
      
    });
    await newBooking.save();
  } catch (err) {
    console.log(err);
  }

  if (!newBooking) {
    return res.status(500).json({ message: "Unable to add Booking" });
  }
  return res.status(201).json({ booking: newBooking});
};

const updateBooking = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, address, city, code, phone, adults, kids, room,nights, request,payment } = req.body;
  let bookingToUpdate;
  try {
    bookingToUpdate = await Booking.findById(id);
    if (!bookingToUpdate) {
      return res.status(404).json({ message: "Booking not found" });
    }
    bookingToUpdate.name = name;
    bookingToUpdate.email = email;
    bookingToUpdate.address = address;
    bookingToUpdate.city = city;
    bookingToUpdate.code = code;
    bookingToUpdate.phone = phone;
    bookingToUpdate.adults = adults;
    bookingToUpdate.kids = kids;
    bookingToUpdate.room = room;
    bookingToUpdate.nights = nights;
    bookingToUpdate.request = request;
    bookingToUpdate.payment = payment;
    await bookingToUpdate.save();
  } catch (err) {
    console.log(err);
  }

  if (!bookingToUpdate) {
    return res.status(500).json({ message: "Unable to update Booking" });
  }
  return res.status(200).json({ booking: bookingToUpdate });
};

const deleteBooking = async (req, res, next) => {
  const id = req.params.id;
  try {
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllBookings = getAllBookings;
exports.addBooking = addBooking;
exports.getBookingById = getBookingById;
exports.updateBooking = updateBooking;
exports.deleteBooking = deleteBooking;