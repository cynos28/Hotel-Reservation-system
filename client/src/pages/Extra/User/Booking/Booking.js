import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";
import back from "./img/bk.jpg";
import Header from "../../../../components/header/header";
import Footer from "../../../../components/footer/Footer";
const priceMap = {
  gym: 2500,
  pool: 3000,
  bar: 5200,
  spa: 4500,
  vehicle: 7000,
  dayplan: 1500,
  specialday: 1500,
  petfriend: 2000,
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

  //Generate the Outo Calculations
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
    //Display the Alert
    window.alert("Booking successfully!");
    //Navigate summry page
    navigate(`/summary/extraid/${inputs.extraid}`);
  };
  //Store Data
  const sendRequest = async () => {
    await axios.post("http://localhost:3001/extra", inputs);
  };

  return (
    <>
      <Header />
      <div className="bk_book">
        <div className="ful_extr">
          <h1 className="topic_extra">
            Booking<span className="sub_topic_extra"> Now..!</span>
          </h1>
          <div className="form_box_extra_new">
            <form className="form_extra_new" onSubmit={handleSubmit}>
              <label className="form_lable_extra">ID</label>
              <br />
              <input
                className="form_input_extra"
                required
                value={inputs.extraid}
                onChange={handleChange}
                type="text"
                name="extraid"
                readOnly
              />

              <br />
              <label className="form_lable_extra">Full Name</label>
              <br />

              {/* frontend validate */}

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

              {/* frontend validate */}

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

              {/* frontend validate */}

              <input
                className="form_input_extra"
                required
                value={inputs.phone}
                onChange={handleChange}
                type="text"
                //Phone number Validators

                pattern="\d{10}"
                name="phone"
              />
              <br />
              <label className="form_lable_extra">Select Your Facility</label>
              <br />
              <input
                className="form_input_extra_checkbox"
                onChange={handleChange}
                type="checkbox"
                id="gym"
                name="gym"
                checked={inputs.gym}
              />
              <label className="form_lable_extra" htmlFor="gym">
                Gym
              </label>
              <br />
              <input
                className="form_input_extra_checkbox"
                onChange={handleChange}
                type="checkbox"
                id="pool"
                name="pool"
                checked={inputs.pool}
              />
              <label className="form_lable_extra" htmlFor="pool">
                Pool
              </label>
              <br />
              <input
                className="form_input_extra_checkbox"
                onChange={handleChange}
                type="checkbox"
                id="bar"
                name="bar"
                checked={inputs.bar}
              />
              <label className="form_lable_extra" htmlFor="bar">
                Bar
              </label>
              <br />
              <input
                className="form_input_extra_checkbox"
                onChange={handleChange}
                type="checkbox"
                id="spa"
                name="spa"
                checked={inputs.spa}
              />
              <label className="form_lable_extra" htmlFor="spa">
                Spa
              </label>
              <br />
              <input
                className="form_input_extra_checkbox"
                onChange={handleChange}
                type="checkbox"
                id="vehicle"
                name="vehicle"
                checked={inputs.vehicle}
              />
              <label className="form_lable_extra" htmlFor="vehicle">
                vehicle
              </label>
              <br />
              <input
                className="form_input_extra_checkbox"
                onChange={handleChange}
                type="checkbox"
                id="dayplan"
                name="dayplan"
                checked={inputs.dayplan}
              />
              <label className="form_lable_extra" htmlFor="dayplan">
                Day Plan
              </label>
              <br />
              <input
                className="form_input_extra_checkbox"
                onChange={handleChange}
                type="checkbox"
                id="specialday"
                name="specialday"
                checked={inputs.specialday}
              />
              <label className="form_lable_extra" htmlFor="specialday">
                Special Day
              </label>
              <br />
              <input
                className="form_input_extra_checkbox"
                onChange={handleChange}
                type="checkbox"
                id="petfriend"
                name="petfriend"
                checked={inputs.petfriend}
              />
              <label className="form_lable_extra" htmlFor="petfriend">
                Pet Friend
              </label>
              <br />
              <label className="form_lable_extra">Total</label>
              <br />
              <input
                className="form_input_extra"
                required
                type="text"
                name="total"
                value={inputs.total}
                readOnly
              />
              <br />
              <button className="centerbtn_extra" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Booking;
