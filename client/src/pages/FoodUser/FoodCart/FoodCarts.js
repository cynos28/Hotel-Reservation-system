import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/header";
import { PAYMENT_TYPES } from "../../../constants";
import { addPayment } from "../../../redux/features/payment/paymentSlice";
import axios from "axios";

const Carts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const userId = user?._id; // get the user id from the logged in user

  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/carts?email=${user.email}`);
        const filteredCarts = response.data.carts.filter((cart) => cart.email === user.email);
        setCarts(filteredCarts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching carts:", error);
        setError("Failed to fetch cart details");
        setLoading(false);
      }
    };

    if (user && user.email) {
      fetchCarts();
    }
  }, [user]);

  useEffect(() => {
    let total = 0;
    carts.forEach((cart) => {
      total += parseFloat(cart.total);
    });
    setTotalAmount(total);
  }, [carts]);

  const handleRemoveFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/carts/${id}`);
      setCarts((prevCarts) => prevCarts.filter((cart) => cart._id !== id));
      alert("Item removed from cart successfully.");
    } catch (error) {
      console.error("Error removing item from cart:", error);
      alert("Failed to remove item from cart");
    }
  };

  // add payment details to Redux
  const onNavigateToDelivery = () => {
    if (userId) {
      dispatch(addPayment({ type: PAYMENT_TYPES.FOOD, total: totalAmount }));
      navigate("/add-delivery");
    } else {
      alert("Please login to continue");
      navigate("/login");
    }
  };

  return (
    <div>
      <Header />
      <div>
        <div className="card_ful_cart">
          <h2 className="carts-header">Food Cart</h2>
          <div className="button-container">
            <button
              onClick={() => (window.location.href = "/foods")}
              className="add-new-bu"
            >
              Add New
            </button>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="carts-list">
              {carts.length === 0 ? (
                <p>No items in cart</p>
              ) : (
                <div>
                  {carts.map((cart) => (
                    <div key={cart._id} className="">
                      <div className="cart_detail_box">
                        <img
                          src={cart.image}
                          alt={cart.name}
                          className="cart_item_image_cart"
                        />

                        <div>
                          <h3 className="itmname">{cart.name}</h3>
                          <p className="itmprice">Price: Rs {cart.price}.00</p>
                          <p className="itmprice">Quantity: {cart.qty}</p>
                          <p className="itmprice tot">Total: Rs {cart.total}.00</p>
                        </div>
                        <div className="edit_btnx">
                          <Link to={`/update-cart/${cart._id}`}>
                            <button className="updtbtn1">Edit</button>
                          </Link>
                          <br></br>
                          <button
                            className="dlt_btn"
                            onClick={() => handleRemoveFromCart(cart._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="total-amount">
                    <h3 className="tot_topic">
                      You have to pay{" "}
                      <span className="tot">Rs {totalAmount.toFixed(2)}</span>{" "}
                    </h3>
                  </div>
                  <button onClick={onNavigateToDelivery} className="add-new-bu">
                    Checkout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
    </div>
    
  );
};

export default Carts;
 