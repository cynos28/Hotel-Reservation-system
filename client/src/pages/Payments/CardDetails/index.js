import "./styles.css";

import React, { useEffect, useState } from "react";

import { BACKEND_URL } from "../../../constants";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/header";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function CardDetail() {
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id; // get the user id from the logged in user

  const navigate = useNavigate();

  const [isLoadingCards, setIsLOadingCards] = useState(false);
  const [cards, setCards] = useState([]);
  const [searchedCards, setSearchedCards] = useState([]);

  const [searchText, setSearchText] = useState("");

  const onSearchCard = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
    const searchedCards = cards.filter((card) =>
      card.cardName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchedCards(searchedCards);
  };

  const fetchUserCards = async () => {
    setIsLOadingCards(true);
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/users/${userId}/cards`
      );
      const userCards = response.data?.data;
      setSearchedCards(userCards);
      setCards(userCards);
    } catch (error) {
      console.error("Error fetching cards: ", error);
    } finally {
      setIsLOadingCards(false);
    }
  };

  useEffect(() => {
    fetchUserCards();
  }, []);

  const onDeleteCard = async (cardId) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/users/${userId}/cards/${cardId}`);
      window.alert("Card deleted successfully!");
      fetchUserCards();
    } catch (error) {
      console.error("Error deleting card: ", error);
    }
  };

  const onNavigateToAddCard = () => {
    navigate("/add-card");
  };

  return (
    <div>
      <Header />
      <div className="card_details_container">
        <div className="find_full">
          <h1 className="main_book_topic_card">
            Your Card <span className="sub_book_topic_card">Details..!</span>
          </h1>
          <button
            onClick={onNavigateToAddCard}
            className="detail_save_btn"
            type="submit"
          >
            Add New Card
          </button>
          <div className="search_cardName">
            <input
              value={searchText}
              onChange={onSearchCard}
              required
              type="text"
              name="cardName"
              className="search_cno"
              placeholder="Cardholder Name.."
            />
          </div>
          <br />
          {isLoadingCards ? (
            <>
              <br />
              <h4 className="main_book_topic_card">Loading...</h4>
            </>
          ) : cards.length === 0 ? (
            <>
              <br />
              <p className="main_book_topic_card">No Cards found!</p>
            </>
          ) : (
            <div className="tble_card_details_main">
              <table className="tble_card_details">
                <thead className="tble_card_details_hed">
                  <tr className="tble_card_details_tr">
                    <th className="tble_card_details_th">Card Name</th>
                    <th className="tble_card_details_th">Card Number</th>
                    <th className="tble_card_details_th">Expiration Date</th>
                    <th className="tble_card_details_th">Cvv</th>
                    <th className="tble_card_details_th">Actions</th>
                  </tr>
                </thead>
                {searchedCards.map((card) => (
                  <tbody>
                    <tr key={card._id}>
                      <td className="tble_card_details_th">{card.cardName}</td>
                      <td className="tble_card_details_th">{card.cardNo}</td>
                      <td className="tble_card_details_th">{card.expDate}</td>
                      <td className="tble_card_details_th">{card.cvv}</td>
                      <td className="tble_card_details_th">
                        <Link
                          to={`/update-card/${card._id}`}
                          className="updtbtn"
                        >
                          Update
                        </Link>
                        <button
                          className="dltbtn"
                          onClick={() => onDeleteCard(card._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CardDetail;
