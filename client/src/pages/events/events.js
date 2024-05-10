// Import necessary libraries
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../events/events.css"; // Import the CSS file
import Header from "../../components/header/header";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import birthday1 from "./eventPhotos/birthday1.jpg";
import dance from "./eventPhotos/dance.jpg";
import GetT from "./eventPhotos/GetT.jpg";
import party1 from "./eventPhotos/party1.jpg";
import wedding1 from "./eventPhotos/wedding1.jpg";
import { Trash, PencilSquare } from "react-bootstrap-icons"; // Import Bootstrap Icons
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import "./modal.css";
import { useSelector } from "react-redux";

// Define component
const Events = () => {
  const [events, setEvents] = useState([]);
  const [viewEvents, setEventData] = useState([]);
  const [viewEvents1, setEventData1] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/event")
      .then((response) => {
        console.log(response.data);
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  console.log(viewEvents);

  // Define image map
  const imageMap = {
    "./eventPhotos/birthday1.jpg": birthday1,
    "./eventPhotos/dance.jpg": dance,
    "./eventPhotos/GetT.jpg": GetT,
    "./eventPhotos/party1.jpg": party1,
    "./eventPhotos/wedding1.jpg": wedding1,
  };

  // Function to format date as "YYYY/MM/DD"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
  };

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Declined":
        return "red";
      case "Pending":
        return "orange";
      case "Approved":
        return "green";
      default:
        return "gray"; // Default color for unknown status values
    }
  };

  const viewItem = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/event/${id}`);
      setEventData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  const viewItem1 = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/event/${id}`);
      setEventData1(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const [modal1, setModal1] = useState(false);

  const toggleModal1 = () => {
    setModal1(!modal1);
  };

  if (modal1) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  //delete Event Function
  const deleteEvent = async (eventId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/event/${eventId}`
      );
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== eventId)
      );

      // Show success message upon successful deletion
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Event deleted successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      toast.success(response.data.msg, { position: "top-right" });
    } catch (error) {
      console.log(error);
      toast.error("Error deleting event");
    }
  };

  // Function to calculate hours between two times
  const calculateHours = (startTime, endTime) => {
    const start = new Date(`01/01/2022 ${startTime}`);
    const end = new Date(`01/01/2022 ${endTime}`);
    const diff = end - start;
    const hours = diff / 1000 / 60 / 60; // Convert milliseconds to hours
    return hours;
  };

  // Render component
  return (
    <div>
      <Header />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
      />

      <div className="events-page">
        <div className="public-events">
          <h2 className="to1">Public Events</h2>
          <div className="events-container">
            {events
              .filter((event) => event.etype === "Public")
              .map((event) => (
                <div
                  key={event._id}
                  className="event-card"
                  onClick={() => {
                    toggleModal(), viewItem(event._id);
                  }}
                >
                  <img
                    src={"http://localhost:3001/events/" + event.image}
                    alt={event.image}
                    className="event-image"
                  />
                  <h3>{event.name}</h3>
                  <p>Date: {formatDate(event.date)}</p>
                  <p>Venue: {event.venue}</p>
                  <p>Capacity: {event.cap}</p>
                </div>
              ))}
          </div>
          {modal && (
            <div className="modal">
              <div onClick={toggleModal} className="overlay"></div>
              <div className="modal-content">
                <div>
                  <h4>{viewEvents.name}</h4>
                  <img
                    src={"http://localhost:3001/events/" + viewEvents.image}
                    alt={viewEvents.image}
                    className="event-image1"
                  />
                </div>
                <p>Date: {formatDate(viewEvents.date)}</p><br/>
                <p>Venue: {viewEvents.venue}</p><br/>
                <p>Description: {viewEvents.description}</p><br/>
                <button className="close-modal" onClick={toggleModal}>
                  <i class="fa fa-xmark"></i>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="personal-events">
          <div className="personalevent">
            <h2 className="to1">Personal Events</h2>
            <Link to={"/RegisterEvent"} className="book-event-button">
              Add Event
            </Link>
          </div>

          <div className="line"></div>
          <div className="events-container">
            {events
              .filter((event) => event.etype === "Personal")
              .filter((event) => event.userId == user?._id)
              .map((event) => (
                <div
                  key={event._id}
                  className="event-card"
                  onClick={() => {
                    toggleModal1(), viewItem1(event._id);
                  }}
                >
                  <img
                    src={imageMap[event.photo]}
                    alt={event.name}
                    className="event-image"
                  />
                  <h4>{event.name}</h4>
                  <p>Date: {formatDate(event.date)}</p>
                  <p hidden>StartTime: {event.sTime}</p>
                  <p hidden>EndTime: {event.eTime}</p>
                  <p>Hours: {calculateHours(event.sTime, event.eTime)}</p> {/* Display hours between start and end time */}
                  <p>Status:</p>
                  <div
                    className="status-box"
                    style={{ backgroundColor: getStatusColor(event.estatus) }}
                  >
                    <p style={{color:"#FFFFFF"}}>{event.estatus}</p>
                  </div>
                  {event.estatus === "Declined" && (
                    <p style={{ color: "red" }}>Reason: {event.reason}</p>
                  )}
                </div>
              ))}
          </div>
          {modal1 && (
            <div className="modal">
              <div onClick={toggleModal1} className="overlay"></div>
              <div className="modal-content">
                <div>
                  <h4>{viewEvents1.name}</h4>
                  <img
                    src={imageMap[viewEvents1.photo]}
                    alt={viewEvents1.image}
                    className="event-image1"
                  />
                </div>
                
                <p>Venue: {viewEvents1.venue}</p>
                <p>Date: {formatDate(viewEvents1.date)}</p>
                <p>Capacity: {viewEvents1.cap}</p>
                <p>Status:</p>
                <div
                  className="status-box"
                  style={{
                    backgroundColor: getStatusColor(viewEvents1.estatus),
                  }}
                >
                  <p>{viewEvents1.estatus}</p>
                </div>
                <br />
                {viewEvents1.estatus === "Declined" && (
                  <p style={{ color: "red" }}>Reason: {viewEvents1.reason}</p>
                )}

                <button className="EventUpdatebtn">
                <Link
                  to={`/updateEvent/${viewEvents1._id}`}
                  className="btn btn-outline-primary"
                >
                  <PencilSquare />
                  Edit
                </Link>
                </button>
                <button
                  className="EventDeleteBtn"
                  onClick={() => deleteEvent(viewEvents1._id)}
                >
                  <Trash /> Delete
                </button>
                
                <button className="close-modal" onClick={toggleModal1}>
                  <i class="fa fa-xmark"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Events;
