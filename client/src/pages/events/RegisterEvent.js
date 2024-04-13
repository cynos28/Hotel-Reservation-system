import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
import Footer from "../../components/footer/Footer";
import "./RegisterEvent.css"; // Import CSS file
import axios from "axios"
import toast from "react-hot-toast";
import Swal from "sweetalert2"; // Import SweetAlert library

const RegisterEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: "user_1234",
    name: "",
    capacity: "",
    date: "",
    venue: "",
    photo: "",
    eventStatus: "Pending",
    startTime: "",
    endingTime: "",
    estimatedCost: 0,
  });

  const [recommendationMessage, setRecommendationMessage] = useState("");

  const handleCapacityChange = (e) => {
    const { value } = e.target;
    let message = "";
    if (value >= 0 && value <= 200) {
      message =
        "Recommendation: Forevermore Grand Hall is Suitable for this event.";
    } else if (value >= 201 && value <= 350) {
      message =
        "Recommendation: Golden Glade Banquet Hall is Suitable for this event.";
    } else if (value >= 351 && value <= 500) {
      message =
        "Recommendation: Enchanted Gardens Wedding Hall is Suitable for this event.";
    } else {
      message = "Recommendation: Our Hotel Halls are not Suitable for these.";
    }
    setRecommendationMessage(message);
  };

  useEffect(() => {
    let photoLink = "";
    if (formData.name == "Anniversary") {
      photoLink = "./eventPhotos/party1.jpg";
      setFormData({ ...formData, photo: photoLink });
    } else if (formData.name == "Wedding") {
      photoLink = "./eventPhotos/wedding1.jpg";
      setFormData({ ...formData, photo: photoLink });
    } else if (formData.name == "Birthday") {
      photoLink = "./eventPhotos/birthday1.jpg";
      setFormData({ ...formData, photo: photoLink });
    } else if (formData.name == "Get-togethers") {
      photoLink = "./eventPhotos/GetT.jpg";
      setFormData({ ...formData, photo: photoLink });
    } else if (formData.name == "Other-Party") {
      photoLink = "./eventPhotos/dance.jpg";
      setFormData({ ...formData, photo: photoLink });
    }
  }, [formData.name]);

  useEffect(() => {
    const hourlyRates = {
      "Forevermore Grand Hall": 10000,
      "Golden Glade Banquet Hall": 15000,
      "Enchanted Gardens Wedding Hall": 20000,
    };

    const { venue, startTime, endingTime } = formData;
    const start = new Date(`01/01/2000 ${startTime}`);
    const end = new Date(`01/01/2000 ${endingTime}`);
    const durationInHours = (end - start) / (1000 * 60 * 60);
    const price = hourlyRates[venue] * durationInHours;
    setFormData({ ...formData, estimatedCost: price });
  }, [formData.venue, formData.startTime, formData.endingTime]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const eventData = {
      userId: "user_1234",
      name: formData.name,
      cap: formData.capacity,
      date: formData.date,
      venue: formData.venue,
      photo: formData.photo,
      sTime: formData.startTime,
      eTime: formData.endingTime,
      cost: formData.estimatedCost
    };
  
    axios
      .post("http://localhost:3001/api/event/register", eventData)
      .then((response) => {
        console.log("Event created successfully:", response.data);
      toast.success(response.data.msg, { position: "top-right" });

      // Display SweetAlert after successful adding
      Swal.fire({
        icon: "success",
        title: "Event Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/events");
      })
      .catch((error) => {
        console.error("Error creating event:", error);
        // Handle error if needed
      });
  };
  

  return (
    <div>
      <Header />
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          <label>
            Type of the Event:
            </label>
            <select
              name="name"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            >
              <option ></option>
              <option value="Anniversary">Anniversary</option>
              <option value="Wedding">Wedding</option>
              <option value="Birthday">Birthday</option>
              <option value="Get-togethers">Get-togethers</option>
              <option value="Other-Party">Other-Party</option>
            </select>
          
          <label>
            Capacity:
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onBlur={handleCapacityChange} // Add onBlur event listener
              onChange={(e) =>
                setFormData({ ...formData, capacity: e.target.value })
              }
            />
            <p
              className="recommendation-message"
              style={{ color: "#03c987e6" }}
            >
              {recommendationMessage}
            </p>
            <br/>
            <br/>
          
          <label>
            Date:
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          
          <label>
            Venue:
            </label>
            <select
              name="venue"
              onChange={(e) =>
                setFormData({ ...formData, venue: e.target.value })
              }
            >
              <option>---- SELECT ----</option> 
              <option value="Forevermore Grand Hall">
                Forevermore Grand Hall
              </option>
              <option value="Golden Glade Banquet Hall">
                Golden Glade Banquet Hall
              </option>
              <option value="Enchanted Gardens Wedding Hall">
                Enchanted Gardens Wedding Hall
              </option>
            </select>
          
          <label>
            Start Time:
            </label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={(e) =>
                setFormData({ ...formData, startTime: e.target.value })
              }
            />
          
          <label>
            Ending Time:
            </label>
            <input
              type="time"
              name="endingTime"
              value={formData.endingTime}
              onChange={(e) =>
                setFormData({ ...formData, endingTime: e.target.value })
              }
            />
          
          <label className="status-label">Event Status:</label>
          <div className="status-message">{formData.eventStatus}</div>
          <div className="cost-label">
            Estimated Cost: Rs. {formData.estimatedCost}
          </div>
          <button  className="kc6" type="submit">Confirm Booking</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterEvent;