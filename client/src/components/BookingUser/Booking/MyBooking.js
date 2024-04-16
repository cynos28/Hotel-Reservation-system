import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";

const MyBooking = () => {
  const { id } = useParams(); // Get the ID parameter from the URL
  const [bookingData, setBookingData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  /*PDF Function */
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: " Details Report",
    onafterprint: () => alert(" Details Report Successfully Download !"),
  });
  useEffect(() => {
    fetchBookingData();
  }, []);

  const fetchBookingData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/bookings/${id}`);
      setBookingData(response.data.booking);
      setLoading(false);
    } catch (error) {
      setError("Error fetching room details.");
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div ref={ComponentsRef} className="sumry_box">
        <div className="box_sum">
          <h1 className="bock_topic">My Booking Details</h1>
          <p className="sum_detail">
            <b>Name:</b> {bookingData.name}
          </p>
          <p className="sum_detail">
            <b>Email:</b> {bookingData.email}
          </p>
          <p className="sum_detail">
            <b>Address:</b> {bookingData.address}
          </p>
          <p className="sum_detail">
            <b>City:</b> {bookingData.city}
          </p>
          <p className="sum_detail">
            <b>Postal Code:</b> {bookingData.code}
          </p>
          <p className="sum_detail">
            <b>Phone Number:</b> {bookingData.phone}
          </p>
          <p className="sum_detail">
            <b>Number of Adults:</b> {bookingData.adults}
          </p>
          <p className="sum_detail">
            <b>Number of Kids:</b> {bookingData.kids}
          </p>
          <p className="sum_detail">
            <b>Room Type:</b> {bookingData.room}
          </p>
          <p className="sum_detail">
            <b>Special Requests:</b> {bookingData.request}
          </p>
          <button className="btn_dash_admin" onClick={handlePrint}>
            Download Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyBooking;
