import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoMdCart } from "react-icons/io";
import "./foods.css";
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/Footer";

const Food = ({ food }) => {
  const { _id, name, image, time, price, tag } = food;
  return (
    <div>
      <div className="card_ittem_card">
        <img src={image} alt={name} className="img_item_cart" />
        <h3 className="item_name">{name}</h3>
        <div className="item_con">
          <p className="detail_p">
            <b>Preparation Time</b>
            <br /> {time} minutes
          </p>
          <p className="detail_p">
            <b>Price</b>
            <br /> Rs {price}.00
          </p>
          <p className="detail_p">
            <b>Tag</b>
            <br /> {tag}
          </p>
        </div>
        <Link className="btn_Link" to={`/food-details/${_id}`}>
          <button className="view_btn">View</button>
        </Link>
      </div>
    </div>
  );
};

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [tags, setTags] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get("http://localhost:3001/foods");
        setFoods(response.data.foods);
        setFilteredFoods(response.data.foods); // Set filtered foods to all foods initially
        // Extract tags from foods
        const allTags = response.data.foods.map((food) => food.tag);
        // Remove duplicate tags
        const uniqueTags = [...new Set(allTags)];
        setTags(uniqueTags);
      } catch (error) {
        console.error("Error fetching foods:", error);
        setAlertMessage("Error fetching food items.");
      }
    };
    fetchFoods();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const handleTagFilter = (selectedTag) => {
    const filtered = foods.filter((food) => food.tag === selectedTag);
    setFilteredFoods(filtered);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = foods.filter((food) =>
      food.name.toLowerCase().includes(query)
    );
    setFilteredFoods(filtered);
  };

  return (
    <div>
      <Header />
      <div className="pdn_itmdetil">
        <div className="search">
          <input
            type="text"
            placeholder="Search Your Food Here.."
            value={searchQuery}
            className="serch"
            onChange={handleSearch}
          />
          <Link to="/view-cart">
            <img src="/images/cart.png" alt="Cart" className="cart-icon" />
          </Link>
        </div>
        <div className="tags_container">
          <button
            className="filter_btn"
            onClick={() => setFilteredFoods(foods)}
          >
            all
          </button>
          {tags.map((tag) => (
            <button
              className="filter_btn"
              key={tag}
              onClick={() => handleTagFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="card_container_cart">
          {filteredFoods.length > 0
            ? filteredFoods.map((food) => <Food key={food._id} food={food} />)
            : foods.map((food) => <Food key={food._id} food={food} />)}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Foods;