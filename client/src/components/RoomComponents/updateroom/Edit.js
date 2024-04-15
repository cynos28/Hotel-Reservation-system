import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2'; // Import SweetAlert library
import './EditRoom.css'; // Import the custom CSS file
import TopNav from '../../../AdminPanel/AdminComponents/TopNav/TopNav';
import Sidebar from '../../../AdminPanel/AdminComponents/Sidebar/Sidebar';

const Edit = () => {
  const rooms = {
    name: '',
    rentPerNight: 0,
    numberOfBeds: 0,
    roomType: '',
    roomDescription:'',
    image: '',
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(rooms);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setRoom(prevRoom => ({
      ...prevRoom,
      [name]: value
    }));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/getone/${id}`)
      .then((response) => {
        setRoom(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/api/update/${id}`, room);
      toast.success(response.data.msg, { position: 'top-right' });

      // Display SweetAlert after successful update
      Swal.fire({
        icon: 'success',
        title: 'Room Updated Successfully',
        showConfirmButton: false,
        timer: 1500,
      });

      navigate('/roomtable');
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div>
    <TopNav />
    <Sidebar />
    <div className="editContainer">
      <Link to="/roomtable" className="editLinkBack">Back</Link>
      <h3 className="editHeading">Update Room</h3>
      <form className="editFormContainer" onSubmit={submitForm}>


        <label className="editFormLabel" htmlFor="name">Room Name</label>
        <input
          className="editFormInput"
          type="text"
          value={room.name}
          onChange={inputChangeHandler}
          name="name"
          placeholder="Room name"
        />
        <label className="editFormLabel" htmlFor="rentPerNight">Rent per Night</label>
        <input
          className="editFormInput"
          type="text"
          value={room.rentPerNight}
          onChange={inputChangeHandler}
          name="rentPerNight"
          placeholder="Rent per night"
        />
        <label className="editFormLabel" htmlFor="roomDescription">Room Description</label>
        <input
          className="editFormInput"
          type="text"
          value={room.roomDescription}
          onChange={inputChangeHandler}
          name="roomDescription"
          placeholder="Room description"
        />
        <label className="editFormLabel" htmlFor="numberOfBeds">No. Of Beds</label>
        <input
          className="editFormInput"
          type="text"
          value={room.numberOfBeds}
          onChange={inputChangeHandler}
          name="numberOfBeds"
          placeholder="No. Of Beds"
        />

        <label className="editFormLabel" htmlFor="roomType">Room Type</label>
        <input
          className="editFormInput"
          type="text"
          value={room.roomType}
          onChange={inputChangeHandler}
          name="roomType"
          placeholder="Room Type"
        />
        <button type="submit" className="editBtnSubmit">UPDATE Room</button>
      </form>
    </div>
    </div>
  );
};

export default Edit;
