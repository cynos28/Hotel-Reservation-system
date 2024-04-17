import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../user.css";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/header";

const AddToCart = () => {
  const history = useNavigate();
  const location = useLocation();
  const [item, setItem] = useState({
    name: "",
    image: "",
    time: "",
    price: "",
    tag: "",
    qty: 1,
    total: "", // Default total value
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (location.state && location.state.food) {
      const { name, image, time, price, tag } = location.state.food;
      setItem({
        ...item,
        name,
        image,
        time,
        price,
        tag,
        total: price, // Set default total value to be the price of one item
      });
    }
  }, [location.state.food]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "qty" || name === "price") {
      const totalPrice = parseFloat(value) * parseFloat(item.price);
      setItem((prevState) => ({
        ...prevState,
        total: totalPrice.toFixed(2),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");
    try {
      await axios.post("http://localhost:3001/carts/", item);
      alert("Item added to cart successfully.");
      history("/view-cart"); // corrected usage of history
    } catch (error) {
      console.error("Error adding item to cart:", error); // log error for debugging
      setError("Error adding item to cart."); // set error message
    }
  };

  return (
    <div><Header/>
    <div className="cart-container">
      <h2 className="cart-header">Add to Cart <span className="sub_name"> {item.name}</span></h2>
      <form className="cart-form" onSubmit={handleSubmit}>
        <div>
          <label className="cart-label">Name:</label>
          <br />
          <input
            className="cart-input"
            type="text"
            name="name"
            value={item.name}
            onChange={handleChange}
            readOnly
          />
        </div>

        <div>
          <label className="cart-label">Price:</label>
          <br />
          <input
            className="cart-input"
            type="number"
            name="price"
            value={item.price}
            onChange={handleChange}
            readOnly
          />
        </div>

        <div>
          <label className="cart-label">Quantity:</label>
          <br />
          <input
            className="cart-input"
            type="number"
            name="qty"
            value={item.qty}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <div>
          <label className="cart-label">Total:</label>
          <br />
          <input
            className="cart-input"
            type="text"
            name="total"
            value={item.total}
            readOnly
          />
        </div>
        <br />
        {error && <p className="cart-error-message">{error}</p>}
        <button className="view_btn" type="submit">
          Add to Cart
        </button>
      </form>
    </div>
    <Footer/>
    </div>
  );
};

export default AddToCart;
