import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";
import "./styles.css";
import { BACKEND_URL } from "../../../constants";

function OrderSummary() {

  const [paymentDetails, setPaymentDetails] = useState({});
  const { payId } = useParams(); 

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/payment/payId/${payId}`); 
        setPaymentDetails(response.data.payment);
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    };

    fetchPaymentDetails();
  }, [payId]); 


  const summaryRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => summaryRef.current,
    documentTitle: "Payment Receipt Document",
    onAfterPrint: () => alert("Receipt Successfully Downloaded!"),
  });

  return (
    <div className="summery_full" ref={summaryRef}>
      <div>
        <h1 className="main_book_topic">
          Your Payment <span className="sub_book_topic">Receipt..!</span>
        </h1>
        <div className="summery_full_box">
          <p className="sumary_title remov_mrgn">
            <strong>Payment ID:</strong> {paymentDetails.payid}
          </p>
          <p className="sumary_title">
            <strong>Name:</strong> {paymentDetails.name}
          </p>
          <p className="sumary_title">
            <strong>Booking Type:</strong> {paymentDetails.type}
          </p>
          <p className="sumary_title">
            <strong>Email:</strong> {paymentDetails.gmail}
          </p>
          <p className="sumary_title">
            <strong>Phone Number:</strong> {paymentDetails.phone}
          </p>
          <p className="sumary_title">
            <strong>Payment Amount:</strong> Rs.{paymentDetails.amount}
          </p>
          <button className="pdf_btn" onClick={handlePrint}>Download Receipt</button>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
