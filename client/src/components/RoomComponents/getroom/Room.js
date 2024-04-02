  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import toast from 'react-hot-toast';
  import { Button, Row, Col, Select, Input } from 'antd'; // Import Input component from antd
  import { Link } from 'react-router-dom';
  import "./room.css"; // Import CSS file
  import Header from '../../header/header.js';
  import Footer from '../../footer/Footer.js';

  
  
  


  const { Option } = Select;

  const GetRoom = () => {
    const [rooms, setRooms] = useState([]);
    const [priceRange, setPriceRange] = useState('All');
    const [searchQuery, setSearchQuery] = useState(''); // State variable for search query

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

    const handlePriceRangeChange = (value) => {
      setPriceRange(value);
    };

    const handleSearch = (e) => {
      setSearchQuery(e.target.value); // Update search query state
    };

    const filterRoomsByPriceRange = () => {
      switch (priceRange) {
        case 'Below 6000':
          return rooms.filter(room => room.rentPerNight < 6000);
        case 'Below 7000':
          return rooms.filter(room => room.rentPerNight < 7000);
        case 'Below 10000':
          return rooms.filter(room => room.rentPerNight < 10000);
          case 'Above 15000':
          return rooms.filter(room => room.rentPerNight > 15000);
          case 'Below 200000':
          return rooms.filter(room => room.rentPerNight < 20000);
        default:
          return rooms;
      }
    };

    const filterRoomsBySearch = () => {
      if (!searchQuery) {
        return rooms; // If search query is empty, return all rooms
      }
      return rooms.filter(room => room.roomType.toLowerCase().includes(searchQuery.toLowerCase()));
    };

    return (
      <div>
        <Header />
        <div className="sorting-bar-container">
          <Select className="sorting-dropdown" defaultValue="All" onChange={handlePriceRangeChange}>
            <Option value="All">All</Option>
            <Option value="Below 6000">Below 6000</Option>
            <Option value="Below 7000">Below 7000</Option>
            <Option value="Below 10000">Below 10000</Option>
            <Option value="Above 15000">Above 15000</Option>
          
          </Select>
          <Input
            className="search-input" // Add custom class for styling
            placeholder="Search by room type" // Placeholder text
            onChange={handleSearch} // Handle search input change
            value={searchQuery} // Bind input value to search query state
          />
        </div>
        <div className="room-container">
          <Row justify={'center'} gutter={16}>
            {filterRoomsByPriceRange()
              .filter(room => filterRoomsBySearch().includes(room))
              .map((room, index) => (
                <Col lg={5} sm={24} xs={24} key={index}>
                  <div className='room p-2 bs1 mt-30'>
                    <img src={room.image} className='roomimg' />
                    <div className='room-content dflex align-items-center justify-content-between'>
                      <div>
                        <p>{room.name}</p>
                        <p><h6>Max Count: {room.maxcount} <br/> Type: {room.roomType}</h6></p>
                      </div>
                      <div>
                        <Button className='btnB1 mr-5'>Book Now</Button>
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
