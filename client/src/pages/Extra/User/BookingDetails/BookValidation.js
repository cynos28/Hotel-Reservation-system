import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import Footer from "../../../../components/footer/Footer";
import Header from "../../../../components/header/header";

function BookValidation() {
  const [extra, setExtra] = useState([]);
  const [gmail, setGmail] = useState("");
  const handleChange = (e) => {
    setGmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //Check Gmail first
      const response = await axios.get(
        `http://localhost:3001/extra?gmail=${gmail}`
      );
      console.log("Response:", response.data);
      const relevantCard = response.data.extra.filter(
        (extra) => extra.gmail === gmail
      );
      //Display Related Card
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
    //delete Confirmation
    const confirmed = window.confirm(
      "Are you sure you want to delete this Details?"
    );

    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3001/extra/${_id}`);
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
         <Header />
      <div className="form_box_extra">
        <form className="form_extra" onSubmit={handleSubmit}>
          <label className="form_lable_extra" htmlFor="gmail">
            Enter Your Gmail
          </label>
          <br></br>
          <input
            className="form_input_extra"
            type="email"
            id="gmail"
            name="gmail"
            value={gmail}
            onChange={handleChange}
            required
          />
          <br></br>
          <button className="centerbtn_extra" type="submit">
            Check
          </button>
        </form>
      </div>
      <div className="tbl_data">
        <table className="table_details_admin">
          <thead>
            <tr className="tble_card_details_tr">
              <th className="admin_tbl_th">Name</th>
              <th className="admin_tbl_th">Gmail</th>
              <th className="admin_tbl_th">Phone</th>
              <th className="admin_tbl_th">Facility</th>
              <th className="admin_tbl_th">Total</th>
              <th className="admin_tbl_th">Actions</th>
            </tr>
          </thead>
          {extra.map((extra, index) => (
            <tbody>
              <tr key={index}>
                <td className="admin_tbl_td">{extra.name}</td>
                <td className="admin_tbl_td">{extra.gmail}</td>
                <td className="admin_tbl_td">{extra.phone}</td>
                <td className="admin_tbl_td">
                  {extra.gym === "true" && <span>Gym</span>}
                  {extra.pool === "true" && <span>Pool</span>}
                  {extra.bar === "true" && <span>Bar</span>}
                  {extra.spa === "true" && <span>Spa</span>}
                  {extra.vehicle === "true" && <span>Vehicle</span>}
                  {extra.dayplan === "true" && <span>Day Plan</span>}
                  {extra.specialday === "true" && <span>Special Day</span>}
                  {extra.petfriend === "true" && <span>Pet Friend</span>}
                </td>

                <td className="admin_tbl_td">{extra.total}</td>
                <td className="admin_tbl_td">
                  <Link to={`/updatebook/${extra._id}`} className="booknow_btn">
                    Update
                  </Link>
                  <button
                    className="btn_dash_admin_dlt"
                    onClick={() => deleteHandler(extra._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
     
    </div>
  );
}

export default BookValidation;
