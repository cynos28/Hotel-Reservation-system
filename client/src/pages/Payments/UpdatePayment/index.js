import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "../AddPayment/styles.css";
import axios from "axios";
import { useParams } from "react-router";
import {BACKEND_URL} from "../../../constants";

function UpdatePayment() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const _id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`${BACKEND_URL}/api/payment/${_id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.payment));
    };
    fetchHandler();
  }, [_id]);

  const sendRequest = async () => {
    try {
      await axios.put(`${BACKEND_URL}/api/payment/${_id}`, {
        name: String(inputs.name),
        gmail: String(inputs.gmail),
        cardno: String(inputs.cardno),
        cardname: String(inputs.cardname),
        expdate: String(inputs.expdate),
        cvv: String(inputs.cvv),
        payid: String(inputs.payid),
        type: String(inputs.type),
        amount: String(inputs.amount),
      });
    } catch (error) {
      // Handle error if needed
      console.error("Error updating Payment details:", error);
    }
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => {
      window.alert("Update successfully!");
      history("/card-details");
    });
  };

  return (
    <div>
      <div className="pay_now_box">
        <h1 className="main_book_topic">
          Update Card<span className="sub_book_topic"> Details..!</span>
        </h1>
        <form className="payment_form_pay" onSubmit={handleSubmit}>
          <div className="payment_form_pay_box">
            <div className="payment_form_pay_left">
              
              <h4 className="card_topic">Personal Details..</h4>
              <hr></hr>
              <label className="payment_lable">Full Name</label>
              <br />
              <input
                className="payment_input"
                value={inputs.name}
                onChange={handleChange}
                required
                type="text"
                name="name"
              />
              <br />
              <label className="payment_lable">Gmail</label>
              <br />
              <input
                className="payment_input"
                value={inputs.gmail}
                onChange={handleChange}
                required
                type="email"
                name="gmail"
              />
              <br />
              <label className="payment_lable">Payment ID</label>
              <br />
              <input
                className="payment_input"
                value={inputs.payid}
                onChange={handleChange}
                readOnly
                required
                type="text"
                name="payid"
              />
              <br />
              <label className="payment_lable">Phone</label>
              <br />
              <input
                className="payment_input"
                value={inputs.phone}
                onChange={handleChange}
                required
                type="tel"
                name="phone"
                pattern="[0-9]{10}"
                maxLength={10}
                title="Please enter a 10-digit phone number"
              />
              <br />
            </div>
            <div className="payment_form_pay_left">
              <h4 className="card_topic">Card Details..</h4>
              <hr></hr>
              <label className="payment_lable">Card Number</label>
              <br />
              <input
                className="payment_input"
                value={inputs.cardno}
                onChange={handleChange}
                required
                id="crdNo"
                type="number"
                name="cardno"
                maxLength={18}
              />
              <br />
              <label className="payment_lable">Cardholder Name</label>
              <br />
              <input
                className="payment_input"
                value={inputs.cardname}
                onChange={handleChange}
                required
                type="text"
                name="cardname"
              />
              <br />
              <label className="payment_lable">Exp Date</label>
              <br />
              <input
                className="payment_input"
                value={inputs.expdate}
                onChange={handleChange}
                required
                type="date"
                name="expdate"
              />
              <br />
              <label className="payment_lable">CVV</label>
              <br />
              <input
                className="payment_input"
                value={inputs.cvv}
                onChange={handleChange}
                required
                type="text"
                name="cvv"
                maxLength={3}
              />
              <br />
            </div>
          </div>
          <button className="pay_now_btn" type="submit">
          Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePayment;
