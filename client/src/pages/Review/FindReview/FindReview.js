import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import user from "../Add-Rates/img/user_logo.png";
import "./find.css";
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/Footer";
function FindReview() {
  const [gmail, setGmail] = useState("");
  const [rates, setRates] = useState([]);
  const history = useNavigate();
  const handleChange = (e) => {
    setGmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3001/rates?gmail=${gmail}`
      );
      console.log("Response:", response.data); // Log the response for debugging

      // Filter and set only the relevant rates for the provided Gmail address
      const relevantRates = response.data.rate.filter(
        (rate) => rate.gmail === gmail
      );

      // Set the filtered rates
      setRates(relevantRates);

      // If no relevant rates found, show an alert
      if (relevantRates.length === 0) {
        alert("No ratings found for the enter valid Gmail address");
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };
  const deleteHandler = async (rateId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Details?"
    );

    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3001/rates/${rateId}`);
        window.alert("rates details deleted successfully!");
        window.location.reload();
      } catch (error) {
        // Handle deletion error if needed
        console.error("Error deleting Message details:", error);
      }
    }
  };

  return (
    <div className="rateee_full_box">
      <Header/>
      <div className="">
        <h1 className="rate-topic">
          Your <span className="rate-us"> Reviews</span>{" "}
        </h1>
        <br></br>
        <form onSubmit={handleSubmit} className="rate_full_box_form">
          <label htmlFor="gmail" className="rate_full_box_label">
            Enter Your Gmail:
          </label>
          <br></br>
          <input
            className="rate_full_box_input"
            type="email"
            id="gmail"
            name="gmail"
            value={gmail}
            onChange={handleChange}
            required
          />
          <br></br>
          <button type="submit" className="search_btn sen_btn">
            Check
          </button>
        </form>
        <br></br>
        <div className="full_box_set_rate_disply">
          {rates.map((rate, index) => (
            <div key={index}>
              <div className="details_box_displya">
                <div className="first_box_set_rate_home">
                  <div className="home_left_box">
                    <img src={user} alt="profile" className="profile_icon" />
                  </div>
                  <div className="home_right_box">
                    <h4>{rate.name}</h4>
                    <p>{rate.date}</p>
                  </div>
                </div>
                <div className="rate_display">
                  <input
                    readOnly
                    className="starinput_display"
                    type="radio"
                    id="star1"
                    value="1"
                    checked={rate.ratestar === "1"}
                    onChange={() => {}}
                  />
                  <label
                    className="starlabl_display"
                    htmlFor="star1"
                    title="text"
                  >
                    1 stars
                  </label>
                  <input
                    readOnly
                    className="starinput_display"
                    type="radio"
                    value="2"
                    checked={rate.ratestar === "2"}
                    onChange={() => {}}
                    id="star2"
                  />
                  <label
                    className="starlabl_display"
                    htmlFor="star2"
                    title="text"
                  >
                    2 stars
                  </label>
                  <input
                    readOnly
                    className="starinput_display"
                    type="radio"
                    id="star3"
                    value="3"
                    checked={rate.ratestar === "3"}
                    onChange={() => {}}
                  />
                  <label
                    className="starlabl_display"
                    htmlFor="star3"
                    title="text"
                  >
                    3 stars
                  </label>
                  <input
                    readOnly
                    className="starinput_display"
                    type="radio"
                    value="4"
                    checked={rate.ratestar === "4"}
                    onChange={() => {}}
                    id="star4"
                  />
                  <label
                    className="starlabl_display"
                    htmlFor="star4"
                    title="text"
                  >
                    4 stars
                  </label>
                  <input
                    readOnly
                    className="starinput_display"
                    type="radio"
                    id="star5"
                    value="5"
                    checked={rate.ratestar === "5"}
                    onChange={() => {}}
                  />
                  <label
                    className="starlabl_display"
                    htmlFor="star5"
                    title="text"
                  >
                    5 star
                  </label>{" "}
                  <br></br>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <p className="user_comment">" {rate.comment}. "</p>
                <div className="btn_container_rate">
                  <Link to={`/updatereview/${rate._id}`} className="updtbtn">
                    Update
                  </Link>

                  <button
                    className="dltbtn"
                    onClick={() => deleteHandler(rate._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default FindReview;
