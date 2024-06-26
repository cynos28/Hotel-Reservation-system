import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPayment } from "../../../../redux/features/payment/paymentSlice";
import { PAYMENT_TYPES } from "../../../../constants";
import Header from "../../../../components/header/header";
import Footer from "../../../../components/footer/Footer";

function Summary() {
  const { extraid } = useParams();
  const [booking, setBooking] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const userId = user?._id; // get the user id from the logged in user

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/extra/extraid/${extraid}`
        ); // Use "id" instead of "payid"
        setBooking(response.data.extra);
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    };

    fetchPaymentDetails();
  }, [extraid]); // Depend on "id" instead of "payid"

  // add payment details to Redux
  const onNavigateToPayment = () => {
    if (userId) {
      dispatch(addPayment({ type: PAYMENT_TYPES.EXTRA, total: booking.total }));
      navigate("/add-payment");
    } else {
      alert("Please login to continue");
      navigate("/login");
    }
  };

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="bk_book_sum">
        <div className="summry_div">
          <div className="summry_div_box">
            <h2 className="sum_topic_extra">Summary</h2>
            <p className="sum_detil_extra">
              <b>Booking ID:</b> {booking.extraid}
            </p>
            <p className="sum_detil_extra">
              <b>Name:</b> {booking.name}
            </p>
            <p className="sum_detil_extra">
              <b>Gmail: </b>
              {booking.gmail}
            </p>
            <p className="sum_detil_extra">
              <b>Your Facility:</b> {booking.gym === "true" && <span>Gym</span>}
              {booking.pool === "true" && <span>Pool</span>}
              {booking.bar === "true" && <span>Bar</span>}
              {booking.spa === "true" && <span>Spa</span>}
              {booking.vehicle === "true" && <span>Vehicle</span>}
              {booking.dayplan === "true" && <span>Day Plan</span>}
              {booking.specialday === "true" && <span>Special Day</span>}
              {booking.petfriend === "true" && <span>Pet Friend</span>}
            </p>
            <p className="sum_detil_extra tot">
              <b>Total:</b>
              Rs.{booking.total}.00
            </p>
            {/* Add more booking details as needed */}
            <button className="booknow_btn" onClick={() => window.print()}>
              Download
            </button>
            <button onClick={onNavigateToPayment} className="booknow_btn">
              Pay
            </button>
            <button
              className="booknow_btn"
              onClick={() => (window.location.href = "/bookingvalidate")}
            >
              My Booking
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Summary;
