import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import TopNav from "../../../AdminPanel/AdminComponents/TopNav/TopNav";
import Sidebar from "../../../AdminPanel/AdminComponents/Sidebar/Sidebar";

const URL = "http://localhost:3001/extra";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function AdminDash() {
  //fetch data
  const [extra, setExtra] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setExtra(data.extra));
  }, []);
  /*PDF Function */
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: " Details Report",
    onafterprint: () => alert(" Details Report Successfully Download !"),
  });

  /*Search Function */
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filtered = data.extra.filter((extra) =>
        Object.values(extra).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setExtra(filtered);
      setNoResults(filtered.length === 0);
    });
  };
  /*Delete Code */
  const deleteHandler = async (_id) => {
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

<TopNav />
      <Sidebar />

      <div className="btn_set">
        <button className="booknow_btn" onClick={handlePrint}>
          Generate Report
        </button>
        <div>
          <tr>
            <td className="">
              <input
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                name="search"
                className="serch_inpt"
                placeholder="Search Here..."
              ></input>
            </td>

            <td>
              <button onClick={handleSearch} className="booknow_btn">
                Search
              </button>
            </td>
          </tr>
        </div>
      </div>
      <div className="bok_box_admin" ref={ComponentsRef}>
        <h1 className="topic_extra">
          Customers Booking<span className="sub_topic_extra"> Details..!</span>
        </h1>
        <br></br>
        <table className="table_details_admin">
          <thead>
            <tr className="admin_tbl_tr">
              <th className="admin_tbl_th">name</th>
              <th className="admin_tbl_th">gmail</th>
              <th className="admin_tbl_th">phone</th>
              <th className="admin_tbl_th">Facility</th>
              <th className="admin_tbl_th">Total</th>
              <th className="admin_tbl_th">Actions</th>
            </tr>
          </thead>
          {noResults ? (
            <div>
              <br></br>
              <h1 className="con_topic">
                No <span className="clo_us"> Found</span>{" "}
              </h1>
            </div>
          ) : (
            <tbody>
              {extra.map((item, index) => (
                <tr className="admin_tbl_tr" key={index}>
                  <td className="admin_tbl_td">{item.name}</td>
                  <td className="admin_tbl_td">{item.gmail}</td>
                  <td className="admin_tbl_td">{item.phone}</td>
                  <td className="admin_tbl_td">
                    {item.gym === "true" && <span>Gym</span>}
                    {item.pool === "true" && <span>Pool</span>}
                    {item.bar === "true" && <span>Bar</span>}
                    {item.spa === "true" && <span>Spa</span>}
                    {item.vehicle === "true" && <span>Vehicle</span>}
                    {item.dayplan === "true" && <span>Day Plan</span>}
                    {item.specialday === "true" && <span>Special Day</span>}
                    {item.petfriend === "true" && <span>Pet Friend</span>}
                  </td>
                  <td className="admin_tbl_td">Rs.{item.total}.00</td>
                  <td className="admin_tbl_td">
                    <button
                      className="btn_dash_admin_dlt"
                      onClick={() => deleteHandler(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default AdminDash;
