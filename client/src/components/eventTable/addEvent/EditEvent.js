import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./EventAdd.css"; // Import CSS file
import axios from "axios";
import TopNav from "../../../AdminPanel/AdminComponents/TopNav/TopNav";
import Sidebar from "../../../AdminPanel/AdminComponents/Sidebar/Sidebar";
import toast from "react-hot-toast";
import Swal from "sweetalert2"; // Import SweetAlert library

const EditEvent = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/event/${id}`
        );
        setEventData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchData();
  }, [id]);

  // send files to the server // learn from my other video
  const handleUpload = async (e) => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/api/event/${id}`,
        eventData
      );
      console.log(response);
      toast.success(response.data.msg, { position: "top-right" });

      // Display SweetAlert after successful update
      Swal.fire({
        icon: "success",
        title: "Event Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/EventTable");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div>
      <TopNav />
      <Sidebar />
      <div className="AdminEvent-container">
        <label htmlFor="name">Event Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={eventData.name}
          onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
          className="border-none pl-[10px] p-y-[40px] text-[12pt] mb-[3px] mt-[10px] rounded-[10px] bg-[rgba(255, 255, 255, 0.6)] h-[40px] w-[320px] hover:bg-[rgb(255,255,255)] transition-duration-70ms"
        />

        <label htmlFor="capacity">Capacity:</label>
        <input
          type="number"
          name="capacity"
          id="capacity"
          value={eventData.cap}
          onChange={(e) => setEventData({ ...eventData, cap: e.target.value })}
          className="border-none pl-[10px] p-y-[40px] text-[12pt] mb-[3px] mt-[10px] rounded-[10px] bg-[rgba(255, 255, 255, 0.6)] h-[40px] w-[320px] hover:bg-[rgb(255,255,255)] transition-duration-70ms"
        />

        <label htmlFor="date">Date:</label>
        {eventData && eventData.date && (
          <input
            type="date"
            name="date"
            id="date"
            value={eventData.date.split("T")[0]} // Extract date part and set as value
            onChange={(e) =>
              setEventData({ ...eventData, date: e.target.value })
            }
            className="border-none pl-[10px] p-y-[40px] text-[12pt] mb-[3px] mt-[10px] rounded-[10px] bg-[rgba(255, 255, 255, 0.6)] h-[40px] w-[320px] hover:bg-[rgb(255,255,255)] transition-duration-70ms"
          />
        )}

        <label htmlFor="venue">Venue:</label>
        <select
          name="venue"
          id="venue"
          onChange={(e) => setVenue(e.target.value)}
          className="border-none pl-[10px] p-y-[40px] text-[12pt] mb-[3px] mt-[10px] rounded-[10px] bg-[rgba(255, 255, 255, 0.6)] h-[40px] w-[320px] hover:bg-[rgb(255,255,255)] transition-duration-70ms"
        >
          <option>---- SELECT ----</option>
          <option value="Forevermore Grand Hall">Forevermore Grand Hall</option>
          <option value="Golden Glade Banquet Hall">
            Golden Glade Banquet Hall
          </option>
          <option value="Enchanted Gardens Wedding Hall">
            Enchanted Gardens Wedding Hall
          </option>
        </select>

        <label htmlFor="startTime">Start Time:</label>
        <input
          type="time"
          name="startTime"
          id="startTime"
          value={eventData.sTime}
          onChange={(e) =>
            setEventData({ ...eventData, sTime: e.target.value })
          }
          className="border-none pl-[10px] p-y-[40px] text-[12pt] mb-[3px] mt-[10px] rounded-[10px] bg-[rgba(255, 255, 255, 0.6)] h-[40px] w-[320px] hover:bg-[rgb(255,255,255)] transition-duration-70ms"
        />

        <label htmlFor="endTime">End Time:</label>
        <input
          type="time"
          name="endTime"
          id="endTime"
          value={eventData.eTime}
          onChange={(e) =>
            setEventData({ ...eventData, eTime: e.target.value })
          }
          className="border-none pl-[10px] p-y-[40px] text-[12pt] mb-[3px] mt-[10px] rounded-[10px] bg-[rgba(255, 255, 255, 0.6)] h-[40px] w-[320px] hover:bg-[rgb(255,255,255)] transition-duration-70ms"
        />

        <label htmlFor="desc">Description:</label>
        <input
          type="text"
          name="desc"
          id="desc"
          value={eventData.description}
          onChange={(e) =>
            setEventData({ ...eventData, description: e.target.value })
          }
          placeholder="Enter the Description"
          className="border-none pl-[10px] p-y-[40px] text-[12pt] mb-[3px] mt-[10px] rounded-[10px] bg-[rgba(255, 255, 255, 0.6)] h-[40px] w-[320px] hover:bg-[rgb(255,255,255)] transition-duration-70ms"
        />

        <label htmlFor="eventStatus">Status:</label>
        <select
          name="eventStatus"
          id="eventStatus"
          value={eventData.estatus}
          onChange={(e) =>
            setEventData({ ...eventData, estatus: e.target.value })
          }
          className="border-none pl-[10px] p-y-[40px] text-[12pt] mb-[3px] mt-[10px] rounded-[10px] bg-[rgba(255, 255, 255, 0.6)] h-[40px] w-[320px] hover:bg-[rgb(255,255,255)] transition-duration-70ms"
        >
          <option>---- SELECT ----</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Declined">Declined</option>
        </select>

        <label htmlFor="reason">Reason:</label>
        <input
          type="text"
          name="reason"
          id="reason"
          value={eventData.reason}
          onChange={(e) =>
            setEventData({ ...eventData, reason: e.target.value })
          }
          placeholder="Enter the reason"
          className="border-none pl-[10px] p-y-[40px] text-[12pt] mb-[3px] mt-[10px] rounded-[10px] bg-[rgba(255, 255, 255, 0.6)] h-[40px] w-[320px] hover:bg-[rgb(255,255,255)] transition-duration-70ms"
        />      

        
        
        
        <button
          onClick={handleUpload}
          className="rounded-[7px] w-[300px] p-[6px] text-[#fff] bg-[#c33636] mt-[0] mb-[20px]"
          type="submit"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditEvent;
