import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./foodtable.css";
import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";
import TopNav from "../../../AdminPanel/AdminComponents/TopNav/TopNav";
import Sidebar from "../../../AdminPanel/AdminComponents/Sidebar/Sidebar";

const Food = ({ food, onDelete }) => {
  const { _id, name, image, time, price, tag } = food;

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}?`
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/foods/${_id}`);
        onDelete(_id);
        alert("Food item deleted successfully.");
        window.location.reload();
      } catch (error) {
        // Handle error and provide feedback to the user
      }
    }
  };

  return (
    <tr>
      <td className="admin_tbl_td">
        <img
          src={image}
          alt={name}
          style={{ width: "50px", height: "50px", borderRadius: "8px" }}
        />
      </td>
      <td className="admin_tbl_td">{name}</td>
      <td className="admin_tbl_td">{time} minutes</td>
      <td className="admin_tbl_td">Rs {price}.00</td>
      <td className="admin_tbl_td">{tag}</td>
      <td className="admin_tbl_td">
        <button className="dltbtn" onClick={handleDelete}>
          Delete
        </button>
        <Link to={`/admin-food-update/${_id}`}>
          <button className="updatebtn">Update</button>
        </Link>
      </td>
    </tr>
  );
};

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await axios.get("http://localhost:3001/foods");
      setFoods(response.data.foods);
      setFilteredFoods(response.data.foods); // Set filtered foods to all foods initially
    } catch (error) {
      setAlertMessage("Error fetching food items."); // Display error message to the user
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/foods/${id}`);
      setFoods((prevFoods) => prevFoods.filter((food) => food._id !== id));
      setFilteredFoods((prevFoods) => prevFoods.filter((food) => food._id !== id));
      alert("Food item deleted successfully.");
    } catch (error) {
      // Handle error and provide feedback to the user
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = foods.filter((food) =>
      food.name.toLowerCase().includes(query)
    );
    setFilteredFoods(filtered);
  };

  /*PDF Function */
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: " Details Report",
    onafterprint: () => alert(" Details Report Successfully Download !"),
  });

  return (
    <div>
      <TopNav />
      <Sidebar />
      <h1 className="cart-header">Food Items List</h1>
      {alertMessage && <div style={{ color: "red" }}>{alertMessage}</div>}
      <div className="tbldetsil">
        <div className="search_pdf_div">
          <button
            onClick={() => (window.location.href = "/add-food")}
            className="updatebtn2"
          >
            Add New Item
          </button>
          <div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              className="serch"
              onChange={handleSearch}
            />
          </div>

          <button onClick={handlePrint} className="updatebtn2">
            Generate Report
          </button>
        </div>
        <div className="admin_table">
          <table ref={ComponentsRef} className="table_details_admin">
            <thead>
              <tr>
                <th className="admin_tbl_th">Image</th>
                <th className="admin_tbl_th">Name</th>
                <th className="admin_tbl_th">Preparation Time</th>
                <th className="admin_tbl_th">Price</th>
                <th className="admin_tbl_th">Tag</th>
                <th className="admin_tbl_th">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFoods.length > 0 ? (
                filteredFoods.map((food) => (
                  <Food key={food._id} food={food} onDelete={handleDelete} />
                ))
              ) : (
                <tr>
                  <td colSpan="6">
                    <h1 className="con_topic">
                      No <span className="clo_us"> Found</span>
                    </h1>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Foods;