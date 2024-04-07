import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./addpayment.css";
import axios from "axios";
import bookimg from "./img/bkbokinfrom.png";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../constants";


function AddPayment() {
  const navigate = useNavigate();
  // const { _id } = useParams(); 
  const [inputs, setInputs] = useState({
    name: "",
    gmail: "",
    phone: "",
    cardno: "",
    cardname: "",
    expdate: "",
    cvv: "",
    payid: "",
    type: "",
    amount: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
    window.alert("Payment successfully!");
    navigate(`/ordersummery/payid/${inputs.payid}`); 
  };
  
  const sendRequest = async () => {
    await axios.post(`${BACKEND_URL}/api/payment`, inputs); 
  };

  const generateRandomId = () => {
    const prefix = "ID";
    const digits = Math.floor(10000 + Math.random() * 90000); 
    return prefix + digits;
  };

  const handleGenerateId = () => {
    const randomId = generateRandomId();
    setInputs({ ...inputs, payid: randomId });
  };

  return (
    <div>
      <div className="pay_now_box">
       <h1 className="main_book_topic">Booking <span className="sub_book_topic">Now..!</span></h1>
        <form className="payment_form_pay" onSubmit={handleSubmit}>
          <div className="payment_form_pay_box">
            <div className="payment_form_pay_left">
              <div className="formimg_book_full">
                <img src={bookimg} alt="formimg" className="formimg_book" />
              </div>
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
                className="payment_input_id"
                value={inputs.payid}
                onChange={handleChange}
                readOnly
                required
                type="text"
                name="payid"
              />
              <button className="genarate_id_btn" onClick={handleGenerateId}>
                Generate ID
              </button>
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
              <h4 className="card_topic">Booking Details..</h4>
              <hr></hr>
              <label className="payment_lable">Booking Services</label>
              <br />

              <select
                class="payment_input"
                required
                value={inputs.type}
                onChange={handleChange}
                name="type"
              >
                <option value="">Select Your Services</option>
                <option value="rooms">Rooms</option>
                <option value="pool">Pool</option>
                <option value="bar">Bar</option>
              </select>

              <br />
              <label className="payment_lable">Amount (Rs.)</label>
              <br />
              <input
                className="payment_input"
                value={inputs.amount}
                onChange={handleChange}
                required
                type="text"
                name="amount"
              />
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
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPayment;
