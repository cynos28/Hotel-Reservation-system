import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import './EventTable.css'; // Import custom CSS
import TopNav from '../../../AdminPanel/AdminComponents/TopNav/TopNav';
import Sidebar from '../../../AdminPanel/AdminComponents/Sidebar/Sidebar';
import { Trash, PencilSquare } from 'react-bootstrap-icons'; // Import Bootstrap Icons

const EventTable = () => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterValue, setFilterValue] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/event');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Error fetching data');
            }
        };

        fetchData();
    }, []);

    const deleteRoom = async (eventId) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/event/${eventId}`);
            setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));

            // Show SweetAlert upon successful deletion
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Event deleted successfully!',
                showConfirmButton: false,
                timer: 1500,
            });

            toast.success(response.data.msg, { position: 'top-right' });
        } catch (error) {
            console.log(error);
            toast.error('Error deleting event');
        }
    };

    const filteredEvents = events.filter(event => event.name.toLowerCase().includes(searchTerm.toLowerCase()) && (filterValue === '' || event.cap > parseInt(filterValue)));

    return (

        <div>
    <TopNav />
    <Sidebar />

    <div className="EventTableContainer">
        <div className='EventTable'>
            
            </div>
            <div className="search-container">
                <input type="text" placeholder="Search by room name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <table style={{marginLeft:"100px"}}>
                <thead>
                    <tr>
                        <th scope="col" style={{width:"100px"}}>UserID</th>
                        <th scope="col" style={{width:"140px"}}>Event Name</th>
                        <th scope="col" style={{width:"40px"}}>Capacity</th>
                        <th scope="col"  style={{width:"120px"}}>Date</th>
                        <th scope="col"  style={{width:"140px"}}>Event Type</th>
                        <th scope="col"  style={{width:"200px"}}>Venue</th>
                        <th scope="col"  style={{width:"200px"}}>Status</th>
                        <th scope="col"  style={{width:"200px"}}>Start Time</th>
                        <th scope="col"  style={{width:"200px"}}>End Time</th>
                        <th scope="col"  style={{width:"200px"}}>Cost</th>

                        <th scope="col" className='col1'>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
    filteredEvents.map((event, index) => (
        <tr key={event._id}>          
            <td>{event.userId}</td>
            <td>{event.name}</td>
            <td className='col1'>{event.cap}</td>
            <td>{event.date}</td>
            <td  className='col2'>{event.etype}</td>
            <td>{event.venue}</td>
            <td>{event.estatus}</td>
            <td className='col1'>{event.sTime}</td>
            <td className='col1'>{event.eTime}</td>
            <td>{event.cost}</td>
            <td className='actionButtons'>
                                    <button className="btn btn-outline-danger" onClick={() => deleteRoom(event._id)}>
                                        <Trash /> Delete
                                    </button>
                                    <Link to={'' + event._id} className="btn btn-outline-primary">
                                        <PencilSquare /> Edit
                                    </Link>
                                </td>
        </tr>
    ))
}

                </tbody>
            </table>
            <Link to={"/addEvent"} className='add-Event-button'>Add Event</Link>
        </div>
        </div> 
            
    
    );
};

export default EventTable;
