import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../header/header";
import Footer from "../../../footer/Footer";

const UpdateBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    code: "",
    phone: "",
    adults: 0,
    kids: 0,
    room: "",
    nights: "",
    request: "",
    payment: 0, // Initialize payment as 0
  });

  useEffect(() => {
    fetchBookingData();
  }, []);

  useEffect(() => {
    calculatePayment();
  }, [bookingData.room, bookingData.nights]);

  const fetchBookingData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/bookings/${id}`);
      setBookingData(response.data.booking);
    } catch (error) {
      console.error("Error fetching room data:", error);
      // Handle error and provide feedback to the user
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const calculatePayment = () => {
    let nightlyRate = 0;

    switch (bookingData.room) {
      case "Family Room":
      case "Suite":
        nightlyRate = 30000;
        break;
      case "Deluxe Room":
        nightlyRate = 31000;
        break;
      default:
        nightlyRate = 0;
        break;
    }

    const totalPayment = nightlyRate * parseInt(bookingData.nights);
    setBookingData((prevData) => ({
      ...prevData,
      payment: totalPayment,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/bookings/${id}`, bookingData);
      alert("Booking updated successfully.");
      navigate("/view-booking");
    } catch (error) {
      console.error("Error updating booking:", error);
      
    }
  };
  return (
    <div>
      <Header/>
      <div>
        
      </div>
     <div className="booking-container">
        <form className="booking_form" onSubmit={handleSubmit}>
          <div>
            <div className="imgbox">
            <img src="./images/hotel 6.jpg" alt="Hotel Heritage" ></img>
            </div>
          </div>
          <div className="form_box">
            <div className="left_box">
              <h2 className="booking_header">Personal Details</h2>
              <div>
                <label className="booking-label">Name:</label>
                <br />
                <input
                  className="booking-input"
                  type="text"
                  name="name"
                  value={bookingData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="booking-label">Email:</label>
                <br />
                <input
                  className="booking-input"
                  type="email"
                  name="email"
                  value={bookingData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="booking-label">Address:</label>
                <br />
                <input
                  className="booking-input"
                  type="text"
                  name="address"
                  value={bookingData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="booking-label">City:</label>
                <br />
                <input
                  className="booking-input"
                  type="text"
                  name="city"
                  value={bookingData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="booking-label">Postal Code:</label>
                <br />
                <input
                  className="booking-input"
                  type="text"
                  name="code"
                  value={bookingData.code}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="booking-label">Phone Number:</label>
                <br />
                <input
                  className="booking-input"
                  pattern="\d{10}"
                  type="tel"
                  name="phone"
                  value={bookingData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="right_box">
              <h2 className="booking_header">Reservation Form</h2>
              <div>
                <label className="booking-label">Number of Adults:</label>
                <br />
                <input
                  className="booking-input"
                  type="number"
                  name="adults"
                  value={bookingData.adults}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="booking-label">Number of Kids:</label>
                <br />
                <input
                  className="booking-input"
                  type="number"
                  name="kids"
                  value={bookingData.kids}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
             <label className="booking-label">Room Type:</label>
              <br />
              <select
                 className="booking-input"
               name="room"
              value={bookingData.room}
            onChange={handleChange}
              required
                >
               <option value="">Select Room Type</option>
              <option value="Family Room">Family Room</option>
                <option value="Suite">Suite</option>
              <option value="Deluxe Room">Deluxe Room</option>
              </select>
                </div>
                <div>
                <label className="booking-label">Number of Nights:</label>
                <br />
                <input
                  className="booking-input"
                  type="nights"
                  name="nights"
                  value={bookingData.nights}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="booking-label">Special Requests:</label>
                <br />
                <textarea
                  className="booking-input"
                  name="request"
                  value={bookingData.request}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
            <label className="booking-label">Payment Amount: $ </label>
            <br />
            <input
              className="booking-input"
              
              type="text"
              name="payment"
              value={bookingData.payment} 
              onChange={handleChange}
              
              
            />
          </div>
              <br></br>
              <button className="bookbtn" type="submit">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer/>
      
    </div>
  );
};

export default UpdateBooking;
