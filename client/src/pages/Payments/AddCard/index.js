import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./styles.css";
import axios from "axios";
import { BACKEND_URL } from "../../../constants";
import Header from "../../../components/header/header";

function AddCard(){
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        cardname: "",
        cardno: "",
        expdate: "",
        cvv: "",
      });
      const handleChange = (e) => {
        setInputs((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        await sendRequest();
        window.alert("Saved successfully!");
         navigate(`/card-details`);  
      };
    
      const sendRequest = async () => {
        await axios.post(`${BACKEND_URL}/api/payment`, inputs); 
      };
    
      return (
        <div>
        <Header/>
        <div className="card_container">
        <div className="card_box">
        <h1 className="main_topic">Add Credit Card</h1>
        <form className="card_form" onSubmit={handleSubmit}>
          <div className="card_form_box">
          <div className="card_forming_book">
              <h4 className="card_form_topic">Enter Your credit card details..</h4>
              <hr></hr>
              <label className="card_lable">Cardholder Name</label>
              <br />
              <input
                className="add_card_input"
                value={inputs.cardname}
                onChange={handleChange}
                required
                type="text"
                name="cardname"
                
              />
              <br />
              <label className="card_lable">Card Number</label>
              <br />
              <input
                className="add_card_input"
                value={inputs.cardno}
                onChange={handleChange}
                required
                id="crdNo"
                type="number"
                name="cardno"
                maxLength={18}
              />
              <br />
              <label className="card_lable">Exp Date</label>
              <br />
              <input
                className="add_card_input"
                value={inputs.expdate}
                onChange={handleChange}
                required
                type="date"
                name="expdate"
              />
              <br />
              <label className="card_lable">CVV</label>
              <br />
              <input
                className="add_card_input"
                value={inputs.cvv}
                onChange={handleChange}
                required
                type="text"
                name="cvv"
                maxLength={3}
              />
              <br />
            </div>
            </div>
          <button className="save_btn" type="submit">
            Save
          </button>
        </form>
      </div>
      </div>
      </div>
     );
}
  export default AddCard;