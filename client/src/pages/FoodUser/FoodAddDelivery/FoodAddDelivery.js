import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function AddDelivery() {
  const navigate = useNavigate(); // Changed variable name to navigate
  const [inputs, setInputs] = useState({
    name: "",
    phone: "",
    time: "",
    date: "",
    address: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
    window.alert("added successfully!");
    window.location.reload();
  };
  const sendRequest = async () => {
    await axios.post("http://localhost:8080/deliveries", {
      name: inputs.name,
      phone: inputs.phone,
      time: inputs.time,
      date: inputs.date,
      address: inputs.address,
      location: inputs.location,
    });
  };

  return (
    <div className="cart-container">
      <h2 className="cart-header">Add New Delivery</h2>
      <form className="cart-form" onSubmit={handleSubmit}>
        <label className="cart-label">Name:</label>
        <br></br>
        <input
          className="cart-input"
          type="text"
          name="name"
          value={inputs.name}
          onChange={handleChange}
          required
        />
        <br></br>
        <label className="cart-label">Phone:</label>
        <br></br>
        <input
          className="cart-input"
          type="text"
          name="phone"
          value={inputs.phone}
          onChange={handleChange}
          required
        />
        <br></br>
        <label className="cart-label">Time:</label>
        <br></br>
        <input
          className="cart-input"
          type="time"
          name="time"
          value={inputs.time}
          onChange={handleChange}
          required
        />
        <br></br>
        <label className="cart-label">Date:</label>

        <br></br>
        <input
          className="cart-input"
          type="date"
          name="date"
          value={inputs.date}
          onChange={handleChange}
          required
        />
        <br />
        <label className="cart-label">Address:</label>

        <br></br>
        <input
          className="cart-input"
          type="text"
          name="address"
          value={inputs.address}
          onChange={handleChange}
          required
        />
        <br />
        <label className="cart-label">Location:</label>

        <br></br>
        <input
          className="cart-input"
          type="text"
          name="location"
          value={inputs.location}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit" className="viewbtn">
          Add Address
        </button>
      </form>
    </div>
  );
}

export default AddDelivery;
