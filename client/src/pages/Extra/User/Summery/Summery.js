import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Summary() {
  const { extraid } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/extra/extraid/${extraid}`
        ); // Use "id" instead of "payid"
        setBooking(response.data.extra);
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    };

    fetchPaymentDetails();
  }, [extraid]); // Depend on "id" instead of "payid"

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Summary</h2>
      <p>Booking ID: {booking.extraid}</p>
      <p>Name: {booking.name}</p>
      <p>Gmail: {booking.gmail}</p>
      <p>
        Your Facility: {booking.gym === "true" && <span>Gym</span>}
        {booking.pool === "true" && <span>Pool</span>}
        {booking.bar === "true" && <span>Bar</span>}
        {booking.spa === "true" && <span>Spa</span>}
        {booking.vehicle === "true" && <span>Vehicle</span>}
        {booking.dayplan === "true" && <span>Day Plan</span>}
        {booking.specialday === "true" && <span>Special Day</span>}
        {booking.petfriend === "true" && <span>Pet Friend</span>}
      </p>
      <p>Total: Rs {booking.total}.00</p>
      {/* Add more booking details as needed */}
      <button onClick={() => window.print()}>Download</button>
      <button>Pay</button>
      <button onClick={() => (window.location.href = "/bookingvalidate")}>
        My Booking
      </button>
    </div>
  );
}

export default Summary;
