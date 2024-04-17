import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import "./foodDetails.css";
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/Footer";

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [food, setFood] = useState(null);
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/foods/${id}`);
        setFood(response.data.food);
      } catch (error) {
        console.error("Error fetching food details:", error);
      }
    };

    fetchFoodDetails();
  }, [id]);

  const handleAddToCart = () => {
    // Pass food details to AddToCart component
    navigate("/add-to-cart", { state: { food } });
  };

  if (!food) {
    return <div>Loading...</div>;
  }

  const { name, image, time, price, tag } = food;

  return (
    <div>
       <Header/>
    <div>
     
      <div className="tem_open">
        <div>
          
          <div className="item_card_details">
            
            <div>
            <h3 className="item_name">{name}</h3>
              <img src={image} alt={name} className="itme_img_view" />
              <p className="item_detal_view">
                <b>Preparation Time</b>
                <br></br>
                {time} minutes
              </p>
              <p className="item_detal_view">
                <b>Price</b>
                <br></br> Rs {price}.00
              </p>
              <p className="item_detal_view">
                <b>Tag</b>
                <br></br>
                {tag}
              </p>
              <div className="containerf"  onClick={handleAddToCart}>
                   <button className="view_btn">
                     Add to Cart
                  </button>
            </div>

              {cartMessage && <div>{cartMessage}</div>}
            </div>
          </div>
        </div>
      </div>
      
    </div>
    <Footer/>
    </div>
  );
};

export default FoodDetails;
