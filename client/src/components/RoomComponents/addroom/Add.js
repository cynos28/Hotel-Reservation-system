import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import './AddRoom.css'; // Import custom CSS
import TopNav from '../../../AdminPanel/AdminComponents/TopNav/TopNav';
import Sidebar from '../../../AdminPanel/AdminComponents/Sidebar/Sidebar';

const AddRoom = () => {
  const [room, setRoom] = useState({
    name: '',
    image: null, // Change to accept file
    rentPerNight: '',
    acAvailability: false,
    wifiAvailability: false,
    roomDescription: '',
    numberOfBeds: '',
    roomType: '',
  });
  const [nameError, setNameError] = useState('');
  const [rentError, setRentError] = useState('');
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
    // Clear the error message if input is corrected
    if (name === 'name' && nameError) {
      setNameError('');
    }
    if (name === 'rentPerNight' && rentError) {
      setRentError('');
    }
  };

  const fileChangeHandler = (e) => {
    setRoom({ ...room, image: e.target.files[0] });
  };
//Form Validation for Room Name
  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!name.trim() || !nameRegex.test(name)) {
      setNameError('Room name should contain only letters and spaces');
      return false;
    }
    return true;
  };
//form validation for Rent per night
  const validateRent = (rent) => {
    const rentRegex = /^\d+$/;
    if (!rent.trim() || !rentRegex.test(rent)) {
      setRentError('Rent per night should contain only numbers');
      return false;
    }
    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!validateName(room.name) || !validateRent(room.rentPerNight)) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append('name', room.name);
      formData.append('image', room.image);
      formData.append('rentPerNight', room.rentPerNight);
      formData.append('acAvailability', room.acAvailability);
      formData.append('wifiAvailability', room.wifiAvailability);
      formData.append('roomDescription', room.roomDescription);
      formData.append('numberOfBeds', room.numberOfBeds);
      formData.append('roomType', room.roomType);

      const response = await axios.post('http://localhost:3001/api/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success(response.data.msg, { position: 'top-right' });

      // Display SweetAlert after successful addition
      Swal.fire({
        icon: 'success',
        title: 'Room Added Successfully',
        showConfirmButton: false,
        timer: 1500,
      });

      navigate('/getroom');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <TopNav />
      <Sidebar />
      <div className="addRoomContainer">
        <div className="addRoomForm">
          <Link to="/">Back</Link>
          <h3 className="addRoomHeading">Add New Room</h3>
          <form onSubmit={submitForm}>
            <div className="addRoomFormGroup">
              <label className="addRoomLabel">Room Name</label>
              <input
                type="text"
                className="addRoomInput"
                onChange={inputHandler}
                placeholder="Enter room name"
                name="name"
                required
              />
              {nameError && <div className="error-message">{nameError}</div>}
            </div>
            <div className="addRoomFormGroup">
              <label className="addRoomLabel">Image</label>
              <input
                type="file"
                className="addRoomInput"
                onChange={fileChangeHandler}
                required
              />
            </div>
            <div className="addRoomFormGroup">
              <label className="addRoomLabel">Rent per Night (Rs)</label>
              <input
                type="text"
                className="addRoomInput"
                onChange={inputHandler}
                placeholder="Enter rent per night"
                name="rentPerNight"
                required
              />
              {rentError && <div className="error-message">{rentError}</div>}
            </div>
            <div className="availabilityFormGroup">
              <label className="addRoomLabel">AC Availability</label>
              <select
                className="availabilitySelect"
                value={room.acAvailability ? 'Available' : 'Not Available'}
                onChange={(e) => setRoom({ ...room, acAvailability: e.target.value === 'Available' })}
              >
                <option value="Available">Available</option>
                <option value="Not Available">Not Available</option>
              </select>
            </div>

            <div className="availabilityFormGroup">
              <label className="addRoomLabel">WiFi Availability</label>
              <select
                className="availabilitySelect"
                value={room.wifiAvailability ? 'Available' : 'Not Available'}
                onChange={(e) => setRoom({ ...room, wifiAvailability: e.target.value === 'Available' })}
              >
                <option value="Available">Available</option>
                <option value="Not Available">Not Available</option>
              </select>
            </div>

            <div className="addRoomFormGroup">
              <label className="addRoomLabel">Room Description</label>
              <textarea
                className="addRoomTextarea"
                onChange={inputHandler}
                placeholder="Enter room description"
                name="roomDescription"
                required
              ></textarea>
            </div>
            <div className="addRoomFormGroup">
              <label className="addRoomLabel">Number of Beds</label>
              <input
                type="text"
                className="addRoomInput"
                onChange={inputHandler}
                placeholder="Enter number of beds"
                name="numberOfBeds"
                required
              />
            </div>
            <div className="addRoomFormGroup">
              <label className="addRoomLabel">Room Type</label>
              <select className="addRoomInput" onChange={inputHandler} name="roomType" required>
                <option value="">Select room type</option>
                <option value="Standard">Standard</option>
                <option value="Deluxe Room">Deluxe Room</option>
                <option value="Suite">Suite</option>
                <option value="Family Room">Family Room</option>
                <option value="Luxury">Luxury</option>
                <option value="Villa">Villa</option>
              </select>
            </div>

            <div className="addRoomTextCenter addRoomMarginTop">
              <button type="submit" className="addRoomSubmitButton">
                Add Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;
