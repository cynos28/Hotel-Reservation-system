import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useParams } from "react-router";
import "../RateDetails/rate.css";

function UpdateReview() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:3001/rates/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.rate));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:3001/rates/${id}`, {
        date: String(inputs.date),
        name: String(inputs.name),
        gmail: String(inputs.gmail),
        ratestar: String(inputs.ratestar),
        comment: String(inputs.comment),
      });
    } catch (error) {
      // Handle error if needed
      console.error("Error updating rate details:", error);
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
      history("/allrate");
    });
  };

  return (
    <div>
      <div className="rate_f_box">
        <div>
          <h1 className="rate-topic">
            Update <span className="rate-us">Review</span>{" "}
          </h1>
          <br></br>
          <div className="rate-full-box">
            <div>
              <form onSubmit={handleSubmit} className="rate-full-box-form">


                <label className="add_form_label">Your Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={inputs.name}
                  onChange={handleChange}
                  className="add_form_input"
                />

                <label className="add_form_label">Your Gmail</label>
                <input
                  required
                  type="email"
                  value={inputs.gmail}
                  onChange={handleChange}
                  name="gmail"
                  className="add_form_input"
                />
                <label className="add_form_label">Date</label>
                <input
                  required
                  type="date"
                  value={inputs.date}
                  onChange={handleChange}
                  name="date"
                  className="add_form_input"
                />
                <label className="add_form_label">Rate</label>
                <div className="rate">
                  <input
                    className="starinput"
                    type="radio"
                    id="star1"
                    value="1"
                    checked={inputs.ratestar === "1"}
                    onChange={handleChange}
                    name="ratestar"
                  />
                  <label className="starlabl" htmlFor="star1" title="text">
                    1 stars
                  </label>
                  <input
                    className="starinput"
                    type="radio"
                    value="2"
                    checked={inputs.ratestar === "2"}
                    onChange={handleChange}
                    id="star2"
                    name="ratestar"
                  />
                  <label className="starlabl" htmlFor="star2" title="text">
                    2 stars
                  </label>
                  <input
                    className="starinput"
                    type="radio"
                    id="star3"
                    value="3"
                    checked={inputs.ratestar === "3"}
                    onChange={handleChange}
                    name="ratestar"
                  />
                  <label className="starlabl" htmlFor="star3" title="text">
                    3 stars
                  </label>
                  <input
                    className="starinput"
                    type="radio"
                    value="4"
                    checked={inputs.ratestar === "4"}
                    onChange={handleChange}
                    id="star4"
                    name="ratestar"
                  />
                  <label className="starlabl" htmlFor="star4" title="text">
                    4 stars
                  </label>
                  <input
                    className="starinput"
                    type="radio"
                    id="star5"
                    value="5"
                    checked={inputs.ratestar === "5"}
                    onChange={handleChange}
                    name="ratestar"
                  />
                  <label className="starlabl" htmlFor="star5" title="text">
                    5 star
                  </label>
                </div>
                <label className="add_form_label">Review</label>
                <textarea
                  required
                  type="email"
                  name="comment"
                  value={inputs.comment}
                  onChange={handleChange}
                  className="add_form_input rate_text_area"
                />

                <button type="submit" className="rate-add-btn">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateReview;
