import "./styles.css";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { BACKEND_URL } from "../../../constants";
import Header from "../../../components/header/header";
import axios from "axios";
import bookimg from "./img/bkbokinfrom.png";
import { useSelector } from "react-redux";

function AddPayment() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // const { bookingId } = useParams();

  const { user } = useSelector((state) => state.auth);

  const userId = user?._id; // get the user id from the logged in user
  const bookingId = "100"; // get the booking id from the url params

  const [bookingState, setBookingState] = useState({
    id: "",
    type: "",
    amount: "",
  });

  const [userCards, setUserCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const getBookingDetails = async () => {
    //TODO: Get booking details by bookingId
    setBookingState({
      id: bookingId,
      type: "Hotel Booking",
      amount: "5000",
    });
  };

  const getUserCards = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/users/${userId}/cards`
      );
      const userCards = response.data.data;
      setUserCards(userCards);
    } catch (error) {
      console.log("getUserCards error: ", error);
    }
  };

  useEffect(() => {
    getBookingDetails();
    getUserCards();
  }, []);

  const onSelectCard = (e) => {
    const selectedCardId = e.target.value;
    const selectedCard = userCards.find((card) => card._id === selectedCardId);
    if (selectedCard) {
      setSelectedCard(selectedCard);
    } else {
      setSelectedCard(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/bookings/${bookingId}/payments`,
        {
          user: {
            id: user?._id,
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
          },
          booking: {
            id: bookingState.id,
            type: bookingState.type,
            amount: bookingState.amount,
          },
          card: {
            id: selectedCard._id,
          },
        }
      );
      window.alert("Payment successfully!");
      const orderId = response.data.data.paymentId;
      navigate(`${currentPath}/summary/${orderId}`);
    } catch (error) {
      console.log("handleSubmit error", error);
    }
  };

  const onNavigateToAddCard = () => {
    navigate(`/add-card`);
  };

  return (
    <div>
      <Header />
      <div className="payment_container">
        <div className="pay_now_box">
          <h1 className="main_book_topic">
            Booking <span className="sub_book_topic">Now..!</span>
          </h1>
          <form className="payment_form_pay" onSubmit={handleSubmit}>
            <div className="payment_form_pay_box">
              <div className="payment_form_pay_left">
                <div className="formimg_book_full">
                  <img src={bookimg} alt="formimg" className="formimg_book" />
                </div>
                <h4 className="card_topic">Personal Details..</h4>
                <hr></hr>
                <label className="payment_lable">Full Name</label>
                <br />
                <input
                  className="payment_input"
                  disabled
                  value={user?.name}
                  type="text"
                  name="name"
                />
                <br />
                <label className="payment_lable">Gmail</label>
                <br />
                <input
                  className="payment_input"
                  value={user?.email}
                  disabled
                  type="email"
                  name="gmail"
                />
                <br />
                <label className="payment_lable">Phone</label>
                <br />
                <input
                  className="payment_input"
                  value={user?.phone}
                  disabled
                  type="tel"
                  name="phone"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  title="Please enter a 10-digit phone number"
                />
                <br />
              </div>
              <div className="payment_form_pay_left">
                <h4 className="card_topic">Booking Details..</h4>
                <hr></hr>
                <label className="payment_lable">Booking Type</label>
                <br />
                <input
                  className="payment_input"
                  value={bookingState.type}
                  disabled
                  type="text"
                  name="type"
                />

                <br />
                <label className="payment_lable">Amount (LKR)</label>
                <br />
                <input
                  className="payment_input"
                  value={bookingState.amount}
                  disabled
                  type="text"
                  name="amount"
                />

                <h4 className="card_topic">Card Details..</h4>
                <hr></hr>
                <div>
                  <select
                    class="payment_input"
                    required
                    value={selectedCard?._id}
                    onChange={onSelectCard}
                    name="type"
                  >
                    <option value="">Select Your Card</option>
                    {/* TODO: Add proper styles to options */}
                    {userCards.map((card) => (
                      <option key={card._id} value={card._id}>
                        <div>{card.cardName}</div>
                        <div>{card.cardNo}</div>
                      </option>
                    ))}
                  </select>
                  <button
                    className="pay_now_btn"
                    onClick={onNavigateToAddCard}
                    type="submit"
                  >
                    Add new card
                  </button>
                </div>
                {selectedCard ? (
                  <>
                    <br />
                    <label className="payment_lable">Card Number</label>
                    <br />
                    <input
                      className="payment_input"
                      value={selectedCard.cardNo}
                      disabled
                      required
                      id="crdNo"
                      type="number"
                      name="cardno"
                      maxLength={18}
                    />
                    <br />
                    <label className="payment_lable">Cardholder Name</label>
                    <br />
                    <input
                      className="payment_input"
                      value={selectedCard.cardName}
                      disabled
                      required
                      type="text"
                      name="cardname"
                    />
                    <br />
                    <label className="payment_lable">Exp Date</label>
                    <br />
                    <input
                      className="payment_input"
                      value={selectedCard.expDate}
                      disabled
                      required
                      type="date"
                      name="expdate"
                    />
                    <br />
                    <label className="payment_lable">CVV</label>
                    <br />
                    <input
                      className="payment_input"
                      value={selectedCard.cvv}
                      disabled
                      required
                      type="text"
                      name="cvv"
                      maxLength={3}
                    />
                    <br />
                  </>
                ) : null}
              </div>
            </div>

            <button className="pay_now_btn" type="submit">
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPayment;
