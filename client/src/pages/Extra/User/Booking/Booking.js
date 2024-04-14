import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";
import './booking.css'
import './color.css'

const priceMap = {
  gym: 250,
  pool: 2550,
  bar: 2570,
  spa: 2540,
  vehicle: 2502,
  dayplan: 2880,
  specialday: 290,
  petfriend: 280,
};

function Booking() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [inputs, setInputs] = useState({
    name: "",
    gmail: "",
    phone: "",
    gym: false,
    pool: false,
    bar: false,
    spa: false,
    vehicle: false,
    dayplan: false,
    specialday: false,
    petfriend: false,
    total: 0,
    extraid: "",
  });
  useEffect(() => {
    // Generate the extraid when the component mounts
    const generatedId = "EX" + Math.floor(100000 + Math.random() * 900000);
    setInputs((prevState) => ({
      ...prevState,
      extraid: generatedId,
    }));
  }, []);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setInputs((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));

    if (type === "checkbox") {
      updateTotal(name, checked);
    }
  };

  const updateTotal = (name, checked) => {
    const price = priceMap[name];
    const currentTotal = inputs.total;

    if (checked) {
      setInputs((prevState) => ({
        ...prevState,
        total: currentTotal + price,
      }));
    } else {
      setInputs((prevState) => ({
        ...prevState,
        total: currentTotal - price,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
    window.alert("Booking successfully!");
    navigate(`/summary/extraid/${inputs.extraid}`);
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:8080/extra", inputs);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>ID</label>
        <br />
        <input
          required
          value={inputs.extraid}
          onChange={handleChange}
          type="text"
          name="extraid"
          readOnly
        />

        <br />
        <label>Full Name</label>
        <br />
        <input
          required
          value={inputs.name}
          onChange={handleChange}
          type="text"
          name="name"
        />
        <br />
        <label>Gmail</label>
        <br />
        <input
          required
          value={inputs.gmail}
          onChange={handleChange}
          type="email"
          name="gmail"
        />
        <br />
        <label>Phone</label>
        <br />
        <input
          required
          value={inputs.phone}
          onChange={handleChange}
          type="text"
          name="phone"
        />
        <br />
        <label>Select Your Facility</label>
        <br />
        <input
          onChange={handleChange}
          type="checkbox"
          id="gym"
          name="gym"
          checked={inputs.gym}
        />
        <label htmlFor="gym">Gym</label>
        <br />
        <input
          onChange={handleChange}
          type="checkbox"
          id="pool"
          name="pool"
          checked={inputs.pool}
        />
        <label htmlFor="pool">Pool</label>
        <br />
        <input
          onChange={handleChange}
          type="checkbox"
          id="bar"
          name="bar"
          checked={inputs.bar}
        />
        <label htmlFor="bar">Bar</label>
        <br />
        <input
          onChange={handleChange}
          type="checkbox"
          id="spa"
          name="spa"
          checked={inputs.spa}
        />
        <label htmlFor="spa">Spa</label>
        <br />
        <input
          onChange={handleChange}
          type="checkbox"
          id="vehicle"
          name="vehicle"
          checked={inputs.vehicle}
        />
        <label htmlFor="vehicle">vehicle</label>
        <br />
        <input
          onChange={handleChange}
          type="checkbox"
          id="dayplan"
          name="dayplan"
          checked={inputs.dayplan}
        />
        <label htmlFor="dayplan">Day Plan</label>
        <br />
        <input
          onChange={handleChange}
          type="checkbox"
          id="specialday"
          name="specialday"
          checked={inputs.specialday}
        />
        <label htmlFor="specialday">Special Day</label>
        <br />
        <input
          onChange={handleChange}
          type="checkbox"
          id="petfriend"
          name="petfriend"
          checked={inputs.petfriend}
        />
        <label htmlFor="petfriend">Pet Friend</label>
        <br />
        <label>Total</label>
        <br />
        <input
          required
          type="text"
          name="total"
          value={inputs.total}
          readOnly
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Booking;
