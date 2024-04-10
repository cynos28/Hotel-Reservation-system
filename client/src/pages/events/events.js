import Header from "../../components/header/header";
import Footer from "../../components/footer/Footer";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../events/events.css"; // Import the CSS file
import birthday1 from "./eventPhotos/birthday1.jpg";
import dance from "./eventPhotos/dance.jpg";
import GetT from "./eventPhotos/GetT.jpg";
import party1 from "./eventPhotos/party1.jpg";
import wedding1 from "./eventPhotos/wedding1.jpg";
import { Link } from 'react-router-dom';

const Events = () => {
  const [events, setEvents] = useState([]);

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

  const imageMap = {
    "./eventPhotos/birthday1.jpg": birthday1,
    "./eventPhotos/dance.jpg": dance,
    "./eventPhotos/GetT.jpg": GetT,
    "./eventPhotos/party1.jpg": party1,
    "./eventPhotos/wedding1.jpg": wedding1,
  };

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
  return (
    <div>
      <Header />
      <div className="events-page">
        <div className="public-events">
          <h2 className="to1">Public Events</h2>
          <div className="events-container">
            {events
              .filter((event) => event.etype === "Public")
              .map((event) => (
                <div key={event._id} className="event-card">
                  <img
                    src={"http://localhost:3001/events/" + event.image}
                    alt={event.image}
                    className="event-image"
                  />
                  <h3>{event.name}</h3>
                  <p>Date: {event.date}</p>
                  <p>Venue: {event.venue}</p>
                </div>
              ))}
          </div>
        </div>

        <div className="personal-events">
          <h2 className="to1">Personal Events</h2>
          <div className="line"></div>
          <Link to={"/RegisterEvent"} className='book-event-button'>Add Event</Link>
          <div className="events-container">
            {events
              .filter((event) => event.etype === "Personal")
              .map((event) => (
                <div key={event._id} className="event-card">
                  <img
                    src={imageMap[event.photo]}
                    alt={event.name}
                    className="event-image"
                  />
                  <h4>{event.name}</h4>
                  <p>Date: {event.date}</p>
                  <p>Status:</p>
                  <div
                    className="status-box"
                    style={{ backgroundColor: getStatusColor(event.estatus) }}
                  >
                    <p>{event.estatus}</p>
                  </div>
                  {event.estatus === "Declined" && (
                    <p style={{ color: "red" }}>Reason: {event.reason}</p>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* Book Event Button */}
     

      <Footer />
    </div>
  );
};

export default Events;
