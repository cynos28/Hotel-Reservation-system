import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import './Roomtable.css'; // Import custom CSS
import TopNav from '../../../AdminPanel/AdminComponents/TopNav/TopNav';
import Sidebar from '../../../AdminPanel/AdminComponents/Sidebar/Sidebar';
import { Trash, PencilSquare } from 'react-bootstrap-icons'; // Import Bootstrap Icons

const RoomTable = () => {
    const [rooms, setRooms] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/getall');
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
            const response = await axios.delete(`http://localhost:3001/api/delete/${roomId}`);
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

        <div>
    <TopNav />
    <Sidebar />

    <div className="RoomtableContainer">
        <div className='roomTable'>
            <div className="filter-container">
                <select onChange={(e) => setFilterValue(e.target.value)} className="form-select form-select-sm">
                    <option value=''>Rent per day</option>
                    <option value={100}>Above 100</option>
                    <option value={200}>Above 200</option>
                    <option value={300}>Above 300</option>
                </select>
            </div>
            <div className="search-container">
                <input type="text" placeholder="Search by room name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">S.No.</th>
                        <th scope="col">Room name</th>
                        <th scope="col">Rent per Night</th>
                        <th scope="col">Number of Beds</th>
                        <th scope="col">Room type</th>
                        <th scope="col">AC Availability</th>
                        <th scope="col">wifiAvailability</th>
                        <th scope="col">Description</th>
                        
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                {
    filteredRooms.map((room, index) => (
        <tr key={room._id}>
            <td>{index + 1}</td>
            <td>{room.name}</td>
            <td>{room.rentPerNight}</td>
            <td>{room.numberOfBeds}</td>
            <td>{room.roomType}</td>
            <td>{room.acAvailability ? "Available" : "Not Available"}</td>
            <td>{room.wifiAvailability ? "Available" : "Not Available"}</td>
            <td>{room.roomDescription}</td>
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
            <Link to={"/addroom"} className='add-room-button'>Add Room</Link>
        </div>
        </div> </div>
            
    
    );
};

export default RoomTable;
