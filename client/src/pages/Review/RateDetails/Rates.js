import React from "react";
import user from "../Add-Rates/img/user_logo.png";
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/Footer";
function Rates(props) {
  const { _id, date , name, ratestar, comment } = props.rate;

  return (
    <div>
      
      <div>
        <div>
          <div className="details_box_displya">
            <div className="first_box_set_rate_home">
              <div className="home_left_box">
                <img src={user} alt="profile" className="profile_icon" />
              </div>
              <div className="home_right_box">
                <h4>{name}</h4>
                <p>{date}</p>
              </div>
            </div>
            <div className="rate_display">
              <input
                readOnly
                className="starinput_display"
                type="radio"
                id="star1"
                value="1"
                checked={ratestar === "1"}
                onChange={() => {}}
              />
              <label className="starlabl_display" htmlFor="star1" title="text">
                1 stars
              </label>
              <input
                readOnly
                className="starinput_display"
                type="radio"
                value="2"
                checked={ratestar === "2"}
                onChange={() => {}}
                id="star2"
              />
              <label className="starlabl_display" htmlFor="star2" title="text">
                2 stars
              </label>
              <input
                readOnly
                className="starinput_display"
                type="radio"
                id="star3"
                value="3"
                checked={ratestar === "3"}
                onChange={() => {}}
              />
              <label className="starlabl_display" htmlFor="star3" title="text">
                3 stars
              </label>
              <input
                readOnly
                className="starinput_display"
                type="radio"
                value="4"
                checked={ratestar === "4"}
                onChange={() => {}}
                id="star4"
              />
              <label className="starlabl_display" htmlFor="star4" title="text">
                4 stars
              </label>
              <input
                readOnly
                className="starinput_display"
                type="radio"
                id="star5"
                value="5"
                checked={ratestar === "5"}
                onChange={() => {}}
              />
              <label className="starlabl_display" htmlFor="star5" title="text">
                5 star
              </label>{" "}
              <br></br>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <p className="user_comment">" {comment}. "</p>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Rates;
