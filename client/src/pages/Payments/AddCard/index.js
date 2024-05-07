import "./styles.css";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { BACKEND_URL } from "../../../constants";
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/Footer";
import axios from "axios";
import { useSelector } from "react-redux"; /*** */
import { Link } from "react-router-dom";
import cardLogoImg from "./img/visaimg.png";
import cardChipImg from "./img/chipimg.jpg";

function AddCard() {
  const navigate = useNavigate();
  const params = useParams();

  // Fetch user data from Redux state
  const { user } = useSelector((state) => state.auth); //*** */

  const isUpdateOperation = params?.cardId ? true : false;

  const userId = user?._id; // get the user id from the logged in user //** */

  const [isLoadingCard, setIsLoadingCard] = useState(false); // only use if isUpdateOperation is true
  const [inputs, setInputs] = useState({
    cardName: "",
    cardNo: "",
    expDate: "",
    cvv: "",
  });

  const fetchCard = async () => {
    setIsLoadingCard(true);
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/users/${userId}/cards/${params?.cardId}`
      );
      const card = response.data.data;
      setInputs(card);
    } catch (error) {
      console.error("Error fetching card: ", error);
    } finally {
      setIsLoadingCard(false);
    }
  };

  useEffect(() => {
    if (isUpdateOperation) {
      fetchCard();
    }
  }, []);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onResetFields = () => {
    setInputs({
      cardName: "",
      cardNo: "",
      expDate: "",
      cvv: "",
    });
  };

  const onAddNewCard = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BACKEND_URL}/api/users/${userId}/cards`, inputs);
      window.alert("Saved successfully!");
      onResetFields();
      navigate(-1); // go back to the previous page
    } catch (error) {
      console.log("handleSubmit error", error);
      window.alert("unsaved the card!");
    }
  };

  const onUpdateCard = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${BACKEND_URL}/api/users/${userId}/cards/${params?.cardId}`,
        inputs
      );
      window.alert("Updated successfully!");
      onResetFields();
      navigate(-1); // go back to the previous page
    } catch (error) {
      console.log("handleSubmit error", error);
      window.alert("Card is not updated!");
    }
  };
  const onChangeCardNo = (e) => {
    // Remove non-digit characters from the input
    const input = e.target.value.replace(/\D/g, "");

    if (input.length <= 16) {
      // Add dashes at appropriate positions
      let formattedInput = "";
      for (let i = 0; i < input.length; i++) {
        if (i > 0 && i % 4 === 0) {
          formattedInput += "-";
        }
        formattedInput += input[i];
      }

      // Update the state
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: formattedInput,
      }));
    }
  };

  return (
    <div>
      <Header />
      <div className="card_container">
        <div className="card_box">
          <h1 className="card_main_topic">
            {isUpdateOperation ? "Update Card" : "Add Card"}
          </h1>
          <form
            className="card_form"
            onSubmit={isUpdateOperation ? onUpdateCard : onAddNewCard}
          >
            {isLoadingCard ? (
              <h4>Loading ...</h4>
            ) : (
              <>
                <div className="card_form_box">
                  <div className="card_forming_book">
                    <h4 className="card_form_topic">{`${
                      isUpdateOperation ? "Update" : "Enter"
                    } Your card details..`}</h4>
                    <hr></hr>
                    <label className="card_lable">Cardholder Name</label>
                    <br />
                    <input
                      className="add_card_input"
                      value={inputs.cardName}
                      onChange={handleChange}
                      required
                      type="text"
                      name="cardName"
                    />
                    <br />
                    <label className="card_lable">Card Number</label>
                    <br />
                    <input
                      className="add_card_input"
                      value={inputs.cardNo}
                      onChange={onChangeCardNo}
                      required
                      id="crdNo"
                      type="text"
                      name="cardNo"
                      // maxLength={20}
                    />
                    <br />
                    <label className="card_lable">Exp Date</label>
                    <br />
                    <input
                      className="add_card_input"
                      value={inputs.expDate}
                      onChange={handleChange}
                      required
                      type="date"
                      name="expDate"
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
                <button className="card_save_btn" type="submit">
                  {isUpdateOperation ? "Update" : "Save"}
                </button>
              </>
            )}
          </form>
        </div>
        <div className="card_preview">
          <div className="card">
            <div className="card__inner">
              <div className="card__front">
                <div className="card__logo">
                  <img src={cardLogoImg} alt="Card Logo" />
                </div>
                <div className="card__chip">
                  <img src={cardChipImg} alt="Card Chip" />
                </div>
                <p className="card__text">{inputs.cardNo}</p>
                <p className="card__text">{inputs.cardName}</p>
                <p className="card__text">{inputs.expDate}</p>
              </div>
              <div className="card__back">
                <div className="card__cvv">
                  <p className="card__cvv-value">{inputs.cvv}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default AddCard;
