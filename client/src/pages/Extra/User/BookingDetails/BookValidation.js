import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BookValidation() {
  const [extra, setExtra] = useState([]);
  const [gmail, setGmail] = useState("");
  const handleChange = (e) => {
    setGmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8080/extra?gmail=${gmail}`
      );
      console.log("Response:", response.data);
      const relevantCard = response.data.extra.filter(
        (extra) => extra.gmail === gmail
      );

      setExtra(relevantCard);

      if (relevantCard.length === 0) {
        alert("No  found,Plase enter valid Gmail address");
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };
  /*Delete Code */
  const deleteHandler = async (_id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Details?"
    );

    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8080/extra/${_id}`);
        window.alert(" deleted successfully!");
        window.location.reload();
      } catch (error) {
        // Handle deletion error if needed
        console.error("Error deleting Message details:", error);
      }
    }
  };
  return (
    <div>
      <form className="find_form" onSubmit={handleSubmit}>
        <label htmlFor="gmail" className="find_full_box_label">
          Enter Your Gmail
        </label>
        <br></br>
        <input
          className="find_full_box_input"
          type="email"
          id="gmail"
          name="gmail"
          value={gmail}
          onChange={handleChange}
          required
        />
        <br></br>
        <button type="submit" className="btn_find">
          Check
        </button>
      </form>
      <div>
      {extra.map((extra, index) => (
        <table className="tble_card_details">
          <thead className="tble_card_details_hed">
            <tr className="tble_card_details_tr">
              <th className="tble_card_details_th">Name</th>
              <th className="tble_card_details_th">Gmail</th>
              <th className="tble_card_details_th">Phone</th>
              <th className="tble_card_details_th">Facility</th>
              <th className="tble_card_details_th">Total</th>
              <th className="tble_card_details_th">Actions</th>
            </tr>
          </thead>
         
            <tbody>
              <tr key={index}>
                <td className="tble_card_details_th">{extra.name}</td>
                <td className="tble_card_details_th">{extra.gmail}</td>
                <td className="tble_card_details_th">{extra.phone}</td>
                <td className="tble_card_details_th">
                  {extra.gym === "true" && <span>Gym</span>}
                  {extra.pool === "true" && <span>Pool</span>}
                  {extra.bar === "true" && <span>Bar</span>}
                  {extra.spa === "true" && <span>Spa</span>}
                  {extra.vehicle === "true" && <span>Vehicle</span>}
                  {extra.dayplan === "true" && <span>Day Plan</span>}
                  {extra.specialday === "true" && <span>Special Day</span>}
                  {extra.petfriend === "true" && <span>Pet Friend</span>}
                </td>

                <td className="tble_card_details_th">{extra.total}</td>
                <td className="tble_card_details_th">
                  <Link to={`/updatebook/${extra._id}`} className="updtbtn">
                    Update
                  </Link>
                  <button
                    className="dltbtn"
                    onClick={() => deleteHandler(extra._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          
        </table>
        ))}
      </div>
    </div>
  );
}

export default BookValidation;
