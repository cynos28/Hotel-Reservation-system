import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import "./room.css"; // Import CSS file
import Header from '../../header/header.js';
import Footer from '../../footer/Footer.js';



const GetRoom = () => {
  const [rooms, setRooms] = useState([]);

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

  return (
    <div>
      <Header />
    <div className="room-container"> {/* Container with room-container class */}
      <Row justify={'center'} gutter={16}>
        {rooms.map((room, index) => (
          <Col lg={5} sm={24} xs={24} key={index}>
            <div className='room p-2 bs1 mt-30'>
              <img src={room.image} className='roomimg' />
              <div className='room-content dflex align-items-center justify-content-between'>
                <div>
                  <p>{room.name}</p>
                  <p><h6>Max Count: {room.maxcount} <br/> Type: {room.type}</h6></p>
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
