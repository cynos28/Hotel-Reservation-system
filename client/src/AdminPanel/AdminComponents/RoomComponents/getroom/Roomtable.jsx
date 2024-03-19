import React, { useEffect, useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Trash, PencilSquare } from 'react-bootstrap-icons'; // Import Bootstrap Icons
import './room.css'; // Your custom CSS
import { Form } from 'react-bootstrap'; // Import Bootstrap Form

const RoomTable = () => {
    const [rooms, setRooms] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3500/api/getall');
                setRooms(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Error fetching data');
            }
        };

        fetchData();
    }, []);

    const deleteRoom = async (roomId) => {
        try {
            const response = await axios.delete(`http://localhost:3500/api/delete/${roomId}`);
            setRooms((prevRooms) => prevRooms.filter((room) => room._id !== roomId));

            // Show SweetAlert upon successful deletion
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Room deleted successfully!',
                showConfirmButton: false,
                timer: 1500,
            });

            toast.success(response.data.msg, { position: 'top-right' });
        } catch (error) {
            console.log(error);
            toast.error('Error deleting room');
        }
    };

    const filteredRooms = rooms.filter(room => room.name.toLowerCase().includes(searchTerm.toLowerCase()) && (filterValue === '' || room.rentperday > parseInt(filterValue)));

    return (
        <div className='userTable d-flex flex-column align-items-center justify-content-center' style={{ marginTop: '95px', marginLeft: '50px', marginRight: '50px' }}>
            <div className="filter-container">
                <Form.Select onChange={(e) => setFilterValue(e.target.value)} className="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option value=''>Rent per day</option>
                    <option value={100}>Above 100</option>
                    <option value={200}>Above 200</option>
                    <option value={300}>Above 300</option>
                </Form.Select>
            </div>
            <div className="search-container">
                <input type="text" placeholder="Search by room name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th scope="col">S.No.</th>
                        <th scope="col">Room name</th>
                        <th scope="col">Room Rent per day</th>
                        <th scope="col">Maxcount</th>
                        <th scope="col">Room type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredRooms.map((room, index) => (
                            <tr key={room._id}>
                                <td>{index + 1}</td>
                                <td>{room.name}</td>
                                <td>{room.rentperday}</td>
                                <td>{room.maxcount}</td>
                                <td>{room.type}</td>
                                <td className='actionButtons'>
                                    <button className="btn btn-outline-danger" onClick={() => deleteRoom(room._id)}>
                                        <Trash /> Delete
                                    </button>
                                    <Link to={'/edit/' + room._id} className="btn btn-outline-primary">
                                        <PencilSquare /> Edit
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Link to={"/addroom"} className='btn btn-primary mb-3'>Add Room</Link>
        </div>
    );
};

export default RoomTable;
    