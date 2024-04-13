import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./EventAdd.css"; // Import CSS file
import axios from "axios";
import TopNav from "../../../AdminPanel/AdminComponents/TopNav/TopNav";
import Sidebar from "../../../AdminPanel/AdminComponents/Sidebar/Sidebar";
import toast from "react-hot-toast";
import Swal from "sweetalert2"; // Import SweetAlert library


const AddEvent = () => {
  const navigate = useNavigate();
  const [userId, setuserID] = useState("User_123");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [venue, setVenue] = useState("");
  const [eType, setEtype] = useState("Public");
  const [eventStatus, setEventStatus] = useState("Pending");
  const [desc, setDesc] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endingTime, setEndingTime] = useState("");
  const [files, setFiles] = useState(null);
  const inputRef = useRef();
  // console.log(inputRef.current.files[0]);

  // send files to the server // learn from my other video
  const handleUpload = async (e) => {
    const formdata = new FormData();
    formdata.append("userId", userId);
    formdata.append("name", name);
    formdata.append("file", files[0]);
    formdata.append("date", date);
    formdata.append("capacity", capacity);
    formdata.append("venue", venue);
    formdata.append("eType", eType);
    formdata.append("eventStatus", eventStatus);
    formdata.append("startTime", startTime);
    formdata.append("endingTime", endingTime);
    formdata.append("desc", desc);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/event",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      toast.success(response.data.msg, { position: "top-right" });

      // Display SweetAlert after successful adding
      Swal.fire({
        icon: "success",
        title: "Event Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/EventTable");
      // alert(JSON.stringify(response.data, null, 2));
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
          onChange={(e) => setName(e.target.value)}
          className="border-none pl-[10px] p-y-[40px] text-[12pt] mb-[3px] mt-[10px] rounded-[10px] bg-[rgba(255, 255, 255, 0.6)] h-[40px] w-[320px] hover:bg-[rgb(255,255,255)] transition-duration-70ms"
        />

        <label htmlFor="capacity">Capacity:</label>
        <input
          type="number"
          name="capacity"
          id="capacity"
          onChange={(e) => setCapacity(e.target.value)}
          className="border-none pl-[10px] p-y-[40px] text-[12pt] mb-[3px] mt-[10px] rounded-[10px] bg-[rgba(255, 255, 255, 0.6)] h-[40px] w-[320px] hover:bg-[rgb(255,255,255)] transition-duration-70ms"
        />

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          name="date"
          id="date"
          onChange={(e) => setDate(e.target.value)}
          className="border-none pl-[10px] p-y-[40px] text-[12pt] mb-[3px] mt-[10px] rounded-[10px] bg-[rgba(255, 255, 255, 0.6)] h-[40px] w-[320px] hover:bg-[rgb(255,255,255)] transition-duration-70ms"
        />

        {/* <label htmlFor="eType">Event Type:</label>
        <input
          type="text"
          name="eType"
          id="eType"
          className="border-none pl-[10px] p-y-[40px] text-[12pt] mb-[3px] mt-[10px] rounded-[10px] bg-[rgba(255, 255, 255, 0.6)] h-[40px] w-[320px] hover:bg-[rgb(255,255,255)] transition-duration-70ms"
        /> */}

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

        {/* <label htmlFor="eventStatus">Event Status:</label>
        <input
          type="text"
          name="eventStatus"
          id="eventStatus"
          className="border-none pl-[10px] p-y-[40px] text-[12pt] mb-[3px] mt-[10px] rounded-[10px] bg-[rgba(255, 255, 255, 0.6)] h-[40px] w-[320px] hover:bg-[rgb(255,255,255)] transition-duration-70ms"
        /> */}

        <label htmlFor="startTime">Start Time:</label>
        <input
          type="time"
          name="startTime"
          id="startTime"
          onChange={(e) => setStartTime(e.target.value)}
          className="border-none pl-[10px] p-y-[40px] text-[12pt] mb-[3px] mt-[10px] rounded-[10px] bg-[rgba(255, 255, 255, 0.6)] h-[40px] w-[320px] hover:bg-[rgb(255,255,255)] transition-duration-70ms"
        />

        <label htmlFor="endTime">End Time:</label>
        <input
          type="time"
          name="endTime"
          id="endTime"
          onChange={(e) => setEndingTime(e.target.value)}
          className="border-none pl-[10px] p-y-[40px] text-[12pt] mb-[3px] mt-[10px] rounded-[10px] bg-[rgba(255, 255, 255, 0.6)] h-[40px] w-[320px] hover:bg-[rgb(255,255,255)] transition-duration-70ms"
        />

        <label htmlFor="desc">Description:</label>
        <input
          type="text"
          name="desc"
          id="desc"
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Enter the Description"
          className="border-none pl-[10px] p-y-[40px] text-[12pt] mb-[3px] mt-[10px] rounded-[10px] bg-[rgba(255, 255, 255, 0.6)] h-[40px] w-[320px] hover:bg-[rgb(255,255,255)] transition-duration-70ms"
        />

        <input
          type="file"
          multiple
          onChange={(event) => setFiles(event.target.files)}
          hidden
          accept="image/png, image/jpeg"
          ref={inputRef}
        />
        <button type="button" onClick={() => inputRef.current.click()}>
          Add Image
        </button>
        {files && (
          <div className="uploads">
            <ul>
              {Array.from(files).map((file, idx) => (
                <li className="font-[12pt]" key={idx}>
                  {file.name}
                </li>
              ))}
            </ul>
            <div className="actions ">
              <button
                className="rounded-[7px] p-[7px] bg-[#e9eda1] mb-[0]"
                onClick={() => setFiles(null)}
              >
                Cancel
              </button>{" "}
              <br />
              <br />
            </div>
          </div>
        )}
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

export default AddEvent;
