import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { addPayment } from "../../../redux/features/payment/paymentSlice";
import { PAYMENT_TYPES } from "../../../constants";

const MyBooking = () => {
  const { id } = useParams(); // Get the ID parameter from the URL

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const userId = user?._id; // get the user id from the logged in user

  const [bookingData, setBookingData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [nights, setNights] = useState();
  const [payment, setPayment] = useState();

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
  const onNavigateToPayment = () => {
    if (userId) {
      dispatch(
        addPayment({ type: PAYMENT_TYPES.ROOM, total: bookingData.payment })
      );
      navigate("/add-payment");
    } else {
      alert("Please login to continue");
      navigate("/login");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mybooking">
      <div>
        <Header />
      </div>
      <div ref={ComponentsRef} className="sumry_box">
        <div className="box_sum">
          <h1 className="bock_topic">{bookingData.name} </h1>
          <h3 className="bock_topic">Thanks For Your Reservation !</h3>
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
          <p className="sum_detail">
            <b>Payment:</b> $ {bookingData && bookingData.payment}
          </p>
          <button className="btn_dash_admin" onClick={handlePrint}>
            Download Detail
          </button>
          <button onClick={onNavigateToPayment} className="paybutton">
            Pay Now
          </button>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default MyBooking;
