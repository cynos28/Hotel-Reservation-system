import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import axios from "axios";

function UpdateBooking() {
  const [inputs, setInputs] = useState({});

  const history = useNavigate();
  const _id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:8080/extra/${_id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.extra));
    };
    fetchHandler();
  }, [_id]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:8080/extra/${_id}`, {
        name: String(inputs.name),
        gmail: String(inputs.gmail),
        phone: String(inputs.phone),
        gym: String(inputs.gym),
        pool: String(inputs.pool),
        bar: String(inputs.bar),
        spa: String(inputs.spa),
        vehicle: String(inputs.vehicle),
        dayplan: String(inputs.dayplan),
        specialday: String(inputs.specialday),
        petfriend: String(inputs.petfriend),
        total: String(inputs.total),
      });
    } catch (error) {
      // Handle error if needed
      console.error("Error updating details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setInputs((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => {
      window.alert("Update successfully!");
      history("/bookingvalidate");
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <label>Your Facility</label>
        <br></br>
        {inputs.gym === "true" && <span>Gym</span>}
        {inputs.pool === "true" && <span>Pool</span>}
        {inputs.bar === "true" && <span>Bar</span>}
        {inputs.spa === "true" && <span>Spa</span>}
        {inputs.vehicle === "true" && <span>Vehicle</span>}
        {inputs.dayplan === "true" && <span>Day Plan</span>}
        {inputs.specialday === "true" && <span>Special Day</span>}
        {inputs.petfriend === "true" && <span>Pet Friend</span>}
        <br></br>
        <label>Total</label>
        <br />
        {inputs.total}

        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateBooking;
