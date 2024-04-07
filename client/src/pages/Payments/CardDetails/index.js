import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles.css";
import { BACKEND_URL } from "../../../constants";
function CardDetail() {
  const [payment, setPayment] = useState([]);
  const [gmail, setGmail] = useState("");
  const handleChange = (e) => {
    setGmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/payment?gmail=${gmail}`
      );
      console.log("Response:", response.data);
      const relevantCard = response.data.payment.filter(
        (payment) => payment.gmail === gmail
      );

      setPayment(relevantCard);

      if (relevantCard.length === 0) {
        alert("No Card found,Please enter valid Gmail address");
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };

  /*Delete Code */
  const deleteHandler = async (_id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Details?"
    );

    if (confirmed) {
      try {
        await axios.delete(`${BACKEND_URL}/api/payment/${_id}`);
        window.alert("Card details deleted successfully!");
        window.location.reload();
      } catch (error) {
        // Handle deletion error if needed
        console.error("Error deleting Message details:", error);
      }
    }
  };
  return (
    <div>
      <div className="find_full">
        <h1 className="main_book_topic_card">
          Your Card <span className="sub_book_topic">Details..!</span>
        </h1>
        <p className="subpara_card">
          "To ensure the security of your card details, we kindly request your
          cooperation in verifying your identity. Please provide your Gmail
          address below and click on the "Check" button. Upon validation, you
          will be able to access your card details securely.""
        </p>
        <form className="find_form" onSubmit={handleSubmit}>
          <label htmlFor="gmail" className="find_full_box_label">
            Enter Your Gmail
          </label>
          <br></br>
          <input
            className="find_full_box_input"
            type="email"
            id="gmail"
            name="gmail"
            value={gmail}
            onChange={handleChange}
            required
          />
          <br></br>
          <button type="submit" className="btn_find">
            Check
          </button>
        </form>
      </div>
      <div className="tble_card_details_main">
        <table className="tble_card_details">
          <thead className="tble_card_details_hed">
            <tr className="tble_card_details_tr">
              <th className="tble_card_details_th">Name</th>
              <th className="tble_card_details_th">Gmail</th>
              <th className="tble_card_details_th">Phone</th>
              <th className="tble_card_details_th">Card Name</th>
              <th className="tble_card_details_th">Expiration Date</th>
              <th className="tble_card_details_th">CVV</th>
              <th className="tble_card_details_th">Payment ID</th>
              <th className="tble_card_details_th">Type</th>
              <th className="tble_card_details_th">Amount</th>
              <th className="tble_card_details_th">Actions</th>
            </tr>
          </thead>
          {payment.map((payment, index) => (
            <tbody>
              <tr key={index}>
                <td className="tble_card_details_th">{payment.name}</td>
                <td className="tble_card_details_th">{payment.gmail}</td>
                <td className="tble_card_details_th">{payment.phone}</td>
                <td className="tble_card_details_th">{payment.cardname}</td>
                <td className="tble_card_details_th">{payment.expdate}</td>
                <td className="tble_card_details_th">{payment.cvv}</td>
                <td className="tble_card_details_th">{payment.payid}</td>
                <td className="tble_card_details_th">{payment.type}</td>
                <td className="tble_card_details_th">{payment.amount}</td>
                <td className="tble_card_details_th">
                  <Link
                    to={`/updatepayment/${payment._id}`}
                    className="updtbtn"
                  >
                    Update
                  </Link>
                  <button
                    className="dltbtn"
                    onClick={() => deleteHandler(payment._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}

export default CardDetail;
