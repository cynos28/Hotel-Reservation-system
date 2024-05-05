import "./foodAddDelivery.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/header";
import axios from "axios";
import { useSelector } from "react-redux";

function AddDelivery() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    phone: "",
    time: "",
    date: "",
    address: "",
  });

  const { user } = useSelector((state) => state.auth);
  const totalAmount = useSelector((state) => state.payment.totalAmount);

  useEffect(() => {
    if (user) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        name: user.name,
        phone: user.phone,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (
      !inputs.name ||
      !inputs.phone ||
      !inputs.time ||
      !inputs.date ||
      !inputs.address
    ) {
      window.alert("Please fill in all fields");
      return;
    }

    console.log(inputs);
    await sendRequest();
    window.alert("Added successfully!");
    navigate("/add-payment");
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:3001/deliveries", {
      name: inputs.name,
      phone: inputs.phone,
      time: inputs.time,
      date: inputs.date,
      address: inputs.address
    });
  };

  return (
    <div className="back">
      <Header />
      <div className="cart-container">
        <h2 className="cart-header">Add Delivery Details</h2>
        <form className="cart-form" onSubmit={handleSubmit}>
          <label className="cart-label">Name:</label>
          <input
            className="cart-input"
            type="text"
            name="name"
            value={inputs.name}
            readOnly
            required
          />
          <br></br>
          <br></br>
          <label className="cart-label">Phone:</label>
          <input
            className="cart-input"
            type="text"
            name="phone"
            value={inputs.phone}
            onChange={handleChange}
            required
          />
          <br></br>
          <br></br>
          <label className="cart-label">Time:</label>
          <input
            className="cart-input"
            type="time"
            name="time"
            value={inputs.time}
            onChange={handleChange}
            required
          />
          <br></br>
          <br></br>
          <label className="cart-label">Date:</label>
          <input
            className="cart-input"
            type="date"
            name="date"
            value={inputs.date}
            onChange={handleChange}
            required
          />
          <br />
          <br></br>
          <label className="cart-label">Address:</label>
          <input
            className="cart-input"
            type="text"
            name="address"
            value={inputs.address}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <button type="submit" className="viewbtn">
            Go to Payment
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default AddDelivery;
