import "./styles.css";

import React, { useEffect, useRef, useState } from "react";

import { BACKEND_URL } from "../../../constants";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

function PaymentSummary() {
  const summaryRef = useRef();
  const { paymentId } = useParams();

  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const bookingId = "100"; // get the booking id from the url params

  const fetchPaymentDetails = async () => {
    setIsLoadingPayment(true);
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/bookings/${bookingId}/payments/${paymentId}`
      );
      setPaymentDetails(response.data?.data);
    } catch (error) {
      console.error("Error fetching paymentDetails:", error);
    } finally {
      setIsLoadingPayment(false);
    }
  };

  useEffect(() => {
    fetchPaymentDetails();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => summaryRef.current,
    documentTitle: "Payment Receipt Document",
    onAfterPrint: () => alert("Receipt Successfully Downloaded!"),
  });

  return (
    <div>
      <div className="summery_full" ref={summaryRef}>
        <div>
          <h1 className="main_book_topic">
            Your Order <span className="sub_book_topic">Receipt..!</span>
          </h1>
          {isLoadingPayment ? (
            <p>Loading...</p>
          ) : (
            <div className="summery_full_box">
              <p className="sumary_title remov_mrgn">
                <strong>Order ID:</strong> {paymentDetails?._id}
              </p>
              <p className="sumary_title">
                <strong>Name:</strong> {paymentDetails?.user?.name}
              </p>
              <p className="sumary_title">
                <strong>Booking Type:</strong>{" "}
                {paymentDetails?.booking?.bookingType}
              </p>
              <p className="sumary_title">
                <strong>Email:</strong> {paymentDetails?.user?.email}
              </p>
              <p className="sumary_title">
                <strong>Phone Number:</strong> {paymentDetails?.user?.phone}
              </p>
              <p className="sumary_title">
                <strong>Payment Amount:</strong>{" "}
                {paymentDetails?.booking?.amount} LKR
              </p>
            </div>
          )}
        </div>
      </div>
      {!isLoadingPayment && (
        <button className="save_btn" onClick={handlePrint}>
          Download Receipt
        </button>
      )}
    </div>
  );
}

export default PaymentSummary;
