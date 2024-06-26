import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button, Row, Col, Select, Input } from 'antd';
import { Link } from 'react-router-dom';
import "./room.css";
import Header from '../../header/header.js';
import Footer from '../../footer/Footer.js';
import Search from '../../Search/Search.js';
import { SearchOutlined } from '@ant-design/icons';
import { FaSearch } from 'react-icons/fa';


const { Option } = Select;

const GetRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [sortBy, setSortBy] = useState('rentPerNightAscending');
  const [searchQuery, setSearchQuery] = useState('');
  const [roomTypeFilter, setRoomTypeFilter] = useState('');

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

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRoomTypeFilterChange = (value) => {
    setRoomTypeFilter(value);
  };

  const sortRooms = () => {
    let sortedRooms = [...rooms];
    if (sortBy === 'rentPerNightAscending') {
      sortedRooms.sort((a, b) => a.rentPerNight - b.rentPerNight);
    } else if (sortBy === 'rentPerNightDescending') {
      sortedRooms.sort((a, b) => b.rentPerNight - a.rentPerNight);
    }
    return sortedRooms;
  };

//Search room Controller

  const filterRoomsBySearch = (filteredRooms) => {
    if (!searchQuery) {
      return filteredRooms;
    }
    return filteredRooms.filter(room => room.roomType.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const filterRoomsByType = (filteredRooms) => {
    if (!roomTypeFilter) {
      return filteredRooms;
    }
    return filteredRooms.filter(room => room.roomType === roomTypeFilter);
  };

  const filteredRooms = filterRoomsBySearch(filterRoomsByType(sortRooms()));

  return (
    <div className='mainthing'>
      <Header />
      <div className="sorting-bar-container">

        {/*Sorting According to Price */}
  <div className="sorting-dropdown-container">
    <Select className="sorting-dropdown" defaultValue="rentPerNightAscending" onChange={handleSortChange}>
      <Option value="rentPerNightAscending">Rent Per Night (Low to High)</Option>
      <Option value="rentPerNightDescending">Rent Per Night (High to Low)</Option>
    </Select>
  </div>

  <div className="RoomSearchcontainer">
    <Input
      className="search-input"
      placeholder="Search by room type"
      onChange={handleSearch}
      value={searchQuery}
    />
    <button className="search-button">Search</button>
  </div>
{/*Sorting Room Type*/}
  <div className="sorting-dropdown-container">
    <Select className="sorting-dropdown" defaultValue="" onChange={handleRoomTypeFilterChange}>
      <Option value="">All Room Types</Option>
      <Option value="Standard">Standard</Option>
      <Option value="Deluxe Room">Deluxe Room</Option>
      <Option value="Suite">Suite</Option>
      <Option value="Family Room">Family Room</Option>
      <Option value="Luxury">Luxury</Option>
      <Option value="Villa">Villa</Option>
    </Select>
  </div>
</div>


      <div className="room-container">
        <Row justify={'center'} gutter={16}>
          {filteredRooms.map((room, index) => (
            <Col lg={5} sm={24} xs={24} key={index}>
              <div className='room p-2 bs1 mt-30'>
                <img src={"http://localhost:3001/rooms/" + room.image} alt='' className="roomimg" />
                <div className='room-content dflex align-items-center justify-content-between'>
                  <div>
                  <h3 className="room-name">{room.name}</h3>

                    
      <div className="room-det">
  <ul>
    <li><strong>Room Type:</strong> {room.roomType}</li>
    <li><strong>Rent PerNight:</strong> Rs {room.rentPerNight}</li>
  
  </ul>
</div>
                  </div>
                  <div>
             

                    <Link className="btnLink" to={`/room-details/${room._id}`}>

          <button className="Roomviewbtn">View</button>
        </Link>
     
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default GetRoom;
