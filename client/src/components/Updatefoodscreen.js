import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";



function Updatefoodscreen() {

    const { id } = useParams();
    
    const[name,SetName] = useState('');
    const[image,SetImage] = useState('');
    const[time,SetTime] = useState('');
    const[price,SetPrice] = useState();
    const[tag,SetTag] = useState('');
    
    const history = useNavigate();

    useEffect(() => {
        fetchFoods();
      }, []);
    
      const fetchFoods = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/foods/${id}`);

          const FoodData = response.data.food;

          console.log(FoodData);

          SetName(FoodData.name);
          SetImage(FoodData.image);
          SetTime(FoodData.time);
          SetPrice(FoodData.price);
          SetTag(FoodData.tag);
          
        } catch (error) {
          setAlertMessage("Error fetching food items."); // Display error message to the user
        }
      };


    async function handleUpdate(e) {
        e.preventDefault();

        
        const updateFood = {
            _id: id,
            name,
            image,
            time,
            price,
            tag
        }

        try {
            
            
    

            const response = await axios.put(`http://localhost:3001/foods/${id}`,updateFood);
            alert("Food updated successfully") 
            history("/admin-foods");
           
        

        } catch (error) {
            
            console.log(error);
            setAlertMessage("Error updating food items."); 
          

        }

    }
  return (
    <div className="cart-container">
    <h2 className="cart-header">Update Food Item</h2>
    <form className="cart-form" onSubmit={handleUpdate}>
      <div>
        <label className="cart-label">Name:</label>
        <input
          className="cart-input"
          type="text"
          name="name"
          value={name}
          required
          onChange={(e) => {
            SetName(e.target.value);
          }}
        />
      </div>
      <div>
        <label className="cart-label">Image URL:</label>
        <input
          className="cart-input"
          type="text"
          name="image"
          value={image}
          required
          onChange={(e) => {
            SetImage(e.target.value);
          }}
        />
      </div>
      <div>
        <label className="cart-label">Preparation Time (minutes):</label>
        <input
          className="cart-input"
          type="number"
          name="time"
          value={time}
          required
          onChange={(e) => {
            SetTime(e.target.value);
          }}
        />
      </div>
      <div>
        <label className="cart-label">Price:</label>
        <input
          className="cart-input"
          type="number"
          name="price"
          value={price}
          required
          onChange={(e) => {
            SetPrice(e.target.value);
          }}
        />
      </div>
      <div>
        <label className="cart-label">Tag:</label>
        <select
          className="cart-input-select"
          name="tag"
          value={tag}
          required
          onChange={(e) => {
            SetTag(e.target.value);
          }}
        >
          <option value="">Select a category</option>
          <option value="Condiments and Sauces">Condiments and Sauces</option>
          <option value="Seafood">Seafood</option>
          <option value="Meat and Poultry">Meat and Poultry</option>
          <option value="Fresh Produce">Fresh Produce</option>
          <option value="Dairy Products">Dairy Products</option>
          <option value="Cereals and Grains">Cereals and Grains</option>
          <option value="Snacks">Snacks</option>
          <option value="Cooking Oils">Cooking Oils</option>
          <option value="Healthy Foods">Healthy Foods</option>
          <option value="Beverages">Beverages</option>
        </select>
      </div>
      <br></br>

      <button className="viewbtn" type="submit">
       Update
      </button>
    </form>
  </div>
  )
}

export default Updatefoodscreen