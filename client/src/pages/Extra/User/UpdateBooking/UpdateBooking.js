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
        .get(`http://localhost:3001/extra/${_id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.extra));
    };
    fetchHandler();
  }, [_id]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:3001/extra/${_id}`, {
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
      <h1 className="topic_extra">
        Update Your Booking<span className="sub_topic_extra"> Details..!</span>
      </h1>
      <div className="form_box_extra">
        <form className="form_extra" onSubmit={handleSubmit}>
          <label className="form_lable_extra">Full Name</label>
          <br />
          <input
            className="form_input_extra"
            required
            value={inputs.name}
            onChange={handleChange}
            type="text"
            name="name"
          />
          <br />
          <label className="form_lable_extra">Gmail</label>
          <br />
          <input
            className="form_input_extra"
            required
            value={inputs.gmail}
            onChange={handleChange}
            type="email"
            name="gmail"
          />
          <br />
          <label className="form_lable_extra">Phone</label>
          <br />
          <input
            className="form_input_extra"
            required
            value={inputs.phone}
            onChange={handleChange}
            type="text"
            name="phone"
          />
          <br />
          <label className="form_lable_extra">Your Facility</label>
          <br></br>
          {inputs.gym === "true" && (
            <span className="form_lable_extra_updt">Gym</span>
          )}
          {inputs.pool === "true" && (
            <span className="form_lable_extra_updt">Pool</span>
          )}
          {inputs.bar === "true" && (
            <span className="form_lable_extra_updt">Bar</span>
          )}
          {inputs.spa === "true" && (
            <span className="form_lable_extra_updt">Spa</span>
          )}
          {inputs.vehicle === "true" && (
            <span className="form_lable_extra_updt">Vehicle</span>
          )}
          {inputs.dayplan === "true" && (
            <span className="form_lable_extra_updt">Day Plan</span>
          )}
          {inputs.specialday === "true" && (
            <span className="form_lable_extra_updt">Special Day</span>
          )}
          {inputs.petfriend === "true" && (
            <span className="form_lable_extra_updt">Pet Friend</span>
          )}
          <br></br>
          <p className="sum_detil_extra tot">
            <b>Total:</b>
            Rs.{inputs.total}.00
          </p>

          <button className="centerbtn_extra" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateBooking;
