import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import './Roomtable.css'; // Import custom CSS
import TopNav from '../../../AdminPanel/AdminComponents/TopNav/TopNav';
import Sidebar from '../../../AdminPanel/AdminComponents/Sidebar/Sidebar';
import { Trash, PencilSquare } from 'react-bootstrap-icons'; // Import Bootstrap Icons
import { useReactToPrint } from "react-to-print";
import PDFFile from "./RoomReport"; // Import PDF component
import { PDFDownloadLink } from "@react-pdf/renderer";

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

    const handleSearch = () => {
        // Perform search operation based on the searchTerm
        // This function can be customized according to your search requirements
        // For now, it filters rooms based on room name containing the search term
        const filteredRooms = rooms.filter(room => room.name.toLowerCase().includes(searchTerm.toLowerCase()));
        return filteredRooms;
    };

    const filteredRooms = handleSearch();

    /* PDF Generate Function */
    const ComponentsRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => ComponentsRef.current,
        DocumentTitle: "Room Details Report",
        onAfterPrint: () => alert("Room Details Report Successfully Downloaded!"),
    });

    return (
        <div>
            <TopNav />
            <Sidebar />

            <div className="RoomtableContainer">
                <div className='roomTable'>
                    <div className="RoomSearchcontainer">
                        <input
                            type="text"
                            placeholder="Search by room name"
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="search-button" onClick={handleSearch}>Search</button>
                      
                    </div>
                    {/* Button to generate PDF */}
                    <PDFDownloadLink
                        className="generate-room-button1"
                        document={<PDFFile items={filteredRooms} />}
                        fileName="Room_Details_Report.pdf"
                    >
                        {({ loading }) =>
                            loading ? (
                                <button className="bg-BrownLi rounded-md p-[7px] font-bold text-[14px]">
                                    Preparing...
                                </button>
                            ) : (
                                <button className="generate-room-button">Generate Room Report</button>
                            )
                        }
                    </PDFDownloadLink>

                    <table>
                        <thead>
                            <tr>
                                <th scope="col">S.No.</th>
                                <th scope="col">Room name</th>
                                <th scope="col">Rent per Night</th>
                                <th scope="col">Number of Beds</th>
                                <th scope="col">Room type</th>
                                <th scope="col">AC Availability</th>
                                <th scope="col">WiFi Availability</th>
                                <th scope="col">Description</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody ref={ComponentsRef}>
                            {filteredRooms.map((room, index) => (
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
                                            <PencilSquare /><br/> Edit
                                        </Link>
                                      
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
              </div>
            </div>
        </div>
    );
};

export default RoomTable;
