import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";
import "../Admin.css";
import TopNav from "../../../../AdminPanel/AdminComponents/TopNav/TopNav";
import Sidebar from "../../../../AdminPanel/AdminComponents/Sidebar/Sidebar";

const Booking = ({ booking, onDelete }) => {
  const {
    _id,
    name,
    email,
    address,
    city,
    code,
    phone,
    adults,
    kids,
    room: roomType,
    nights,
    request,
    payment,
  } = booking;

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete Booking ${name}?`
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/bookings/${_id}`);
        onDelete(_id);
        alert("Booking deleted successfully.");
        window.location.reload();
      } catch (error) {
        // Handle error and provide feedback to the user
      }
    }
  };

  
 

  return (
    <tr>
      <td className="admin_tbl_td">{name}</td>
      <td className="admin_tbl_td">{email}</td>
      <td className="admin_tbl_td">{address}</td>
      <td className="admin_tbl_td">{city}</td>
      <td className="admin_tbl_td">{code}</td>
      <td className="admin_tbl_td">{phone}</td>
      <td className="admin_tbl_td">{adults}</td>
      <td className="admin_tbl_td">{kids}</td>
      <td className="admin_tbl_td">{roomType}</td>
      <td className="admin_tbl_td">{nights}</td>
      <td className="admin_tbl_td">${payment}</td>
      <td className="admin_tbl_td">{request}</td>
     
      <td className="admin_tbl_td">
        <Link className="updt" to={`/update-room/${_id}`}>
          Update
        </Link>
        <button onClick={handleDelete} className="dltbtn">
          Delete
        </button>
      </td>
    </tr>
  );
};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  /*PDF Function */
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: " Details Report",
    onafterprint: () => alert(" Details Report Successfully Download !"),
  });
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:3001/bookings");
      setBookings(response.data.bookings);
    } catch (error) {
      setError("Error fetching rooms.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/bookings/${id}`);
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== id)
      );
      alert("Booking deleted successfully.");
    } catch (error) {
      // Handle error and provide feedback to the user
    }
  };
  /*Search Function */
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:3001/bookings");
      const filteredBookings = response.data.bookings.filter((booking) =>
        Object.values(booking).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setBookings(filteredBookings);
      setNoResults(filteredBookings.length === 0);
    } catch (error) {
      setError("Error searching bookings.");
    }
  };
  return (
    <div>
      <TopNav />
      <Sidebar />
      <div className="tbl_main">
        <div className="btnset">
          <button className="btn_print" onClick={handlePrint}>
            Download Detail
          </button>
          <div>
            <tr>
              <td className="">
                <input
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="text"
                  name="search"
                  className="serch_inpt "
                  placeholder="Search Here..."
                ></input>
              </td>

              <td>
                <button onClick={handleSearch} className="btn_print lftbtn">
                  Search
                </button>
              </td>
            </tr>
          </div>
        </div>
        <div ref={ComponentsRef}>
          <h1 className="boktopic">Booked Rooms List</h1>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <table className="table_details_admin">
            <thead>
              <tr>
                <th className="admin_tbl_th">Name</th>
                <th className="admin_tbl_th">Email</th>
                <th className="admin_tbl_th">Address</th>
                <th className="admin_tbl_th">City</th>
                <th className="admin_tbl_th">Postal Code</th>
                <th className="admin_tbl_th">Phone Number</th>
                <th className="admin_tbl_th">Adults</th>
                <th className="admin_tbl_th">Kids</th>
                <th className="admin_tbl_th">Room Type</th>
                <th className="admin_tbl_th">Number of Nights</th>
                <th className="admin_tbl_th">Special Request</th>
                <th className="admin_tbl_th">Payment</th>
                <th className="admin_tbl_th">Action</th>
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
                {bookings.map((booking) => (
                  <Booking
                    key={booking._id}
                    booking={booking}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
