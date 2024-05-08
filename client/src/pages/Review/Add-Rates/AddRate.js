import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../RateDetails/rate.css";
import "./addrate.css";
import Question from "./img/Freq1.PNG";
import user from "./img/user_logo.png";
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/Footer";
import { useSelector } from "react-redux";

function AddRate() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); 

  const [inputs, setInputs] = useState({
    date: "",
    name: user?.name || "", // Pre-fill with user's name
    gmail: user?.email || "", // Pre-fill with user's email
    ratestar: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "ratestar" ? value : value.trim();
    setInputs((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);

    
    const ratestarInt = parseInt(inputs.ratestar);

    await sendRequest({
      ...inputs,
      ratestar: ratestarInt,
    });
    window.alert("Submit successfully!");
    navigate("/allrate");
  };
  const sendRequest = async () => {
    await axios.post("http://localhost:3001/rates", {
      date: inputs.date,
      name: inputs.name,
      gmail: inputs.gmail,
      ratestar: inputs.ratestar,
      comment: inputs.comment,
    });
  };

  useEffect(() => {
    // Fetch user data 
    setInputs((prevState) => ({
      ...prevState,
      name: user?.name || "",
      gmail: user?.email || "",
    }));
  }, [user]);

  /*Insert Part End*/

  return (
    <div>
      <Header/>
      <div className="rate_home_container">
        <div className="first_box_set_rate_home">
          <div className="rate_home_left_box">
            <img src={Question} alt="lft box bg" className="q_box_img_rate" />
          </div>
          <div className="rate_home_right_box">
            <h1 className="main_topi_qa">Frequently Asked Question</h1>
            <div className="answerbox">
              <h2 className="answer_topic">
                {" "}
                How do I make a reservation at your hotel?
              </h2>
              <p className="answer_para">
                You can easily make a reservation by visiting our website and
                using our online booking system. Simply select your desired
                dates, room type, and any additional preferences, and follow the
                prompts to complete your reservation
              </p>
            </div>
            <div className="answerbox">
              <h2 className="answer_topic">Do you offer parking facilities?</h2>
              <p className="answer_para">
                Yes, we provide parking facilities for our guests. There may be
                additional charges depending on the duration of your stay.
                Please inquire at the time of booking for more information.
              </p>
            </div>
            <div className="answerbox">
              <h2 className="answer_topic">
                Do you offer special rates for group bookings or events?
              </h2>
              <p className="answer_para">
                Yes, we offer special rates for group bookings and events.
                Please contact our group reservations team to discuss your
                requirements and receive a customized quote.
              </p>
            </div>
          </div>
        </div>
        <div>
        <h1 className="main_topi_qa_new">Reviews ★ 4.7</h1>
          <div className="first_box_set_rate_home">
            <div className="rate_home_left_box">
              <div class="revi_row_rate">
                <div class="colum_one_revi">Service</div>
                <div class="colum_two_revi">
                  <div class="colum_two_revi_sub_one"></div>
                </div>
                <div class="colum_thre_revi">4.5</div>
              </div>
              <div class="revi_row_rate">
                <div class="colum_one_revi">Room Quality</div>
                <div class="colum_two_revi">
                  <div class="colum_two_revi_sub_two"></div>
                </div>
                <div class="colum_thre_revi">4.0</div>
              </div>
              <div class="revi_row_rate">
                <div class="colum_one_revi">Location</div>
                <div class="colum_two_revi">
                  <div class="colum_two_revi_sub_thre"></div>
                </div>
                <div class="colum_thre_revi">4.7</div>
              </div>
            </div>
            <div className="rate_home_right_box">
              <div class="revi_row_rate">
                <div class="colum_one_revi">Facilities</div>
                <div class="colum_two_revi">
                  <div class=" colum_two_revi_sub_two"></div>
                </div>
                <div class="colum_thre_revi">4.2</div>
              </div>
              <div class="revi_row_rate">
                <div class="colum_one_revi">Value for Money</div>
                <div class="colum_two_revi">
                  <div class="colum_two_revi_sub_one"></div>
                </div>
                <div class="colum_thre_revi">4.5</div>
              </div>
              <div class="revi_row_rate">
                <div class="colum_one_revi">Food and Dining</div>
                <div class="colum_two_revi">
                  <div class="colum_two_revi_sub_two"></div>
                </div>
                <div class="colum_thre_revi">4.3</div>
              </div>
            </div>
          </div>
        </div>
        <div className="first_box_set_rate_home">
          <div className="rate_home_left_box">
            <div className="details_box">
              <div className="first_box_set_rate_home">
                <div className="home_left_box">
                  <img src={user} alt="profile" className="profile_icon" />
                </div>
                <div className="home_right_box">
                  <h4>Jhone Doberman</h4>
                  <p>Mar 12,2020</p>
                </div>
              </div>
              <p className="rate_star_box">
                <span className="rate_star_hard_code">★</span>
                <span className="rate_star_hard_code">★</span>
                <span className="rate_star_hard_code">★</span>
                <span>★</span>
                <span>★</span>
              </p>
              <p className="user_comment">
                "Absolutely loved my stay at this hotel! The staff was
                incredibly friendly and accommodating, the room was spacious and
                clean, and the location was perfect for exploring the city. Will
                definitely be returning!"
              </p>
            </div>
            <div className="details_box">
              <div className="first_box_set_rate_home">
                <div className="home_left_box">
                  <img src={user} alt="profile" className="profile_icon" />
                </div>
                <div className="home_right_box">
                  <h4>Emily Johnson</h4>
                  <p>Feb 02,2021</p>
                </div>
              </div>
              <p className="rate_star_box">
                <span className="rate_star_hard_code">★</span>
                <span className="rate_star_hard_code">★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </p>
              <p className="user_comment">
                "My stay at this hotel was nothing short of perfect. The room
                was spacious and beautifully decorated, the on-site restaurant
                served delicious meals, and the rooftop bar had stunning views
                of the city skyline. I couldn't have asked for a better
                experience."
              </p>
            </div>
          </div>
          <div className="rate_home_right_box">
            <div className="details_box">
              <div className="first_box_set_rate_home">
                <div className="home_left_box">
                  <img src={user} alt="profile" className="profile_icon" />
                </div>
                <div className="home_right_box">
                  <h4>Ashley Davis</h4>
                  <p>Dec 12,2020</p>
                </div>
              </div>
              <p className="rate_star_box">
                <span className="rate_star_hard_code">★</span>
                <span className="rate_star_hard_code">★</span>
                <span className="rate_star_hard_code">★</span>
                <span>★</span>
                <span>★</span>
              </p>
              <p className="user_comment">
                "From check-in to check-out, everything about this hotel was
                fantastic. The staff anticipated my needs before I even knew
                them, the room was luxurious and well-appointed, and the overall
                atmosphere was warm and welcoming. It truly felt like a home
                away from home."
              </p>
            </div>
            <div className="details_box">
              <div className="first_box_set_rate_home">
                <div className="home_left_box">
                  <img src={user} alt="profile" className="profile_icon" />
                </div>
                <div className="home_right_box">
                  <h4>Joshua Kim</h4>
                  <p>May 02,2021</p>
                </div>
              </div>
              <p className="rate_star_box">
                <span className="rate_star_hard_code">★</span>
                <span className="rate_star_hard_code">★</span>
                <span className="rate_star_hard_code">★</span>
                <span className="rate_star_hard_code">★</span>
                <span>★</span>
              </p>
              <p className="user_comment">
                "I've stayed at many hotels, but this one stands out for its
                exceptional service. Every staff member greeted me with a smile
                and was eager to assist with any request. The attention to
                customer satisfaction was truly impressive."
              </p>
            </div>
          </div>
        </div>
        <button
          className="show_all_btn"
          onClick={() => {
            window.location.href = "/allrate";
          }}
        >
          Show All Reviews
        </button>

        {/*Data Insert */}
        <div className="rate_f_box">
          <div>
            
            <h1 className="rate-topic">
              Have You Been to Our{" "}
              <span className="rate-us">Hotel better ?</span>{" "}
            </h1>
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
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/*Data Insert End */}
      </div>
      <Footer/>
    </div>
  );
}

export default AddRate;
