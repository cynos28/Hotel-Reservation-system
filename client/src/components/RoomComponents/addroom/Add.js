import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import MuiButton from '@mui/material/Button';
import Swal from 'sweetalert2';
import './AddRoom.css'; // Import custom CSS

const AddRoom = () => {
    const [room, setRoom] = useState({
        name: '',
        image: '',
        rentperday: 0,
        maxcount: 0,
        type: '',
    });

    const navigate = useNavigate();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setRoom({ ...room, [name]: value });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/create', room);
            toast.success(response.data.msg, { position: 'top-right' });

            // Display SweetAlert after successful addition
            Swal.fire({
                icon: 'success',
                title: 'Room Added Successfully',
                showConfirmButton: false,
                timer: 1500,
            });

            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <div className="addRoom">
                <Link to="/">Back</Link>
                <h3>Add New Room</h3>
                <form onSubmit={submitForm}>
                    <div className="form-group">
                        <label>Room Name</label>
                        <input
                            type="text"
                            onChange={inputHandler}
                            placeholder="Enter room name"
                            name="name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Image URL</label>
                        <input
                            type="text"
                            onChange={inputHandler}
                            placeholder="Enter image URL"
                            name="image"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Rent per Day</label>
                        <input
                            type="number"
                            onChange={inputHandler}
                            placeholder="Enter rent per day"
                            name="rentperday"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Max Count</label>
                        <input
                            type="number"
                            onChange={inputHandler}
                            placeholder="Enter max count"
                            name="maxcount"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Room Type</label>
                        <input
                            type="text"
                            onChange={inputHandler}
                            placeholder="Enter room type"
                            name="type"
                            required
                        />
                    </div>
                    <div className="text-center my-3">
                        <MuiButton variant="contained" type="submit">
                            Add Room
                        </MuiButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRoom;
