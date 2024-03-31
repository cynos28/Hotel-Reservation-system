import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import './Roomtable.css'; // Import custom CSS

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
                                    <button onClick={() => deleteRoom(room._id)}>
                                        Delete
                                    </button>
                                    <Link to={'/edit/' + room._id}>
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Link to={"/addroom"} className='add-room-button'>Add Room</Link>
        </div>
    );
};

export default RoomTable;
