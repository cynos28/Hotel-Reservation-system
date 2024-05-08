import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import "./admin.css";
import Sidebar from "../../../AdminPanel/AdminComponents/Sidebar/Sidebar";
import TopNav from "../../../AdminPanel/AdminComponents/TopNav/TopNav";
const URL = "http://localhost:3001/rates";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function RateAdmin() {
  const [rate, setRates] = useState([]);
  useEffect(() => {
    fetchHandler().then((data) => setRates(data.rate));
  }, []);

  /*PDF */
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: " Details Report",
    onafterprint: () => alert(" Details Report Successfully Download !"),
  });
  const deleteHandler = async (_id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Details?"
    );

    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3001/rates/${_id}`);
        window.alert(" deleted successfully!");
        window.location.reload();
      } catch (error) {
        // Handle deletion error if needed
        console.error("Error deleting details:", error);
      }
    }
  };
  return (
    
        <div>
        <Sidebar />
        <TopNav />
    <div className="ratingmar">
    
    <div className="tbl_data">
     
    
      
      
      <div ref={ComponentsRef}>
      <h1 className="topic_rate">
        <br />
          Customers Rating<span className="sub_topic_rate"> Details..!</span>
        </h1>
        <button type="button" className="button_ad_review" onClick={handlePrint}>
        Generate Report
      </button>
      <div ref={ComponentsRef}>
        <table className="table_details_admin">
          <thead>
            <tr className="admin_tbl_tr">
              <th className="admin_tbl_th">Name</th>
              <th className="admin_tbl_th"style={{width:"150px"}}>Date</th>
              <th className="admin_tbl_th" style={{width:"240px"}}>Rating</th>
              <th className="admin_tbl_th">Comment</th>
              <th className="admin_tbl_th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rate.map((rate, index) => (
              <tr className="admin_tbl_tr" key={index}>
                <td className="admin_tbl_td">{rate.name}</td>
                <td className="admin_tbl_td">{rate.date}</td>
                <td className="admin_tbl_td">
                  <div className="rate_display">
                    <input
                      readOnly
                      className="starinput_display"
                      type="radio"
                      id="star1"
                      value="1"
                      checked={rate.ratestar === "1"}
                      onChange={() => {}}
                    />
                    <label
                      className="starlabl_display"
                      htmlFor="star1"
                      title="text"
                    >
                      1 stars
                    </label>
                    <input
                      readOnly
                      className="starinput_display"
                      type="radio"
                      value="2"
                      checked={rate.ratestar === "2"}
                      onChange={() => {}}
                      id="star2"
                    />
                    <label
                      className="starlabl_display"
                      htmlFor="star2"
                      title="text"
                    >
                      2 stars
                    </label>
                    <input
                      readOnly
                      className="starinput_display"
                      type="radio"
                      id="star3"
                      value="3"
                      checked={rate.ratestar === "3"}
                      onChange={() => {}}
                    />
                    <label
                      className="starlabl_display"
                      htmlFor="star3"
                      title="text"
                    >
                      3 stars
                    </label>
                    <input
                      readOnly
                      className="starinput_display"
                      type="radio"
                      value="4"
                      checked={rate.ratestar === "4"}
                      onChange={() => {}}
                      id="star4"
                    />
                    <label
                      className="starlabl_display"
                      htmlFor="star4"
                      title="text"
                    >
                      4 stars
                    </label>
                    <input
                      readOnly
                      className="starinput_display"
                      type="radio"
                      id="star5"
                      value="5"
                      checked={rate.ratestar === "5"}
                      onChange={() => {}}
                    />
                    <label
                      className="starlabl_display"
                      htmlFor="star5"
                      title="text"
                    >
                      5 star
                    </label>
                    <br></br>
                  </div>
                </td>
                <td className="admin_tbl_td">{rate.comment}</td>
                <td className="admin_tbl_td">
                  <button
                    className="dltbtn"
                    onClick={() => deleteHandler(rate._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default RateAdmin;
