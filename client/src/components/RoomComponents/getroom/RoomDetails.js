import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Button,Divider } from "antd"; // Import Row and Col from antd
import "./RoomDetails.css";
import Header from '../../header/header.js';
import Footer from '../../footer/Footer.js';


const RoomDetails = () => {
  const initialRoomState = {
    name: '',
    rentPerNight: 0,
    numberOfBeds: 0,
    roomType: '',
    roomDescription: '',
    image: '',
    wifiAvailability:'',
    acAvailability:'',
     // Should be an empty string
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(initialRoomState);

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

  return (

    <div className="RoomDetailsContainer">
    <div>
           <Header />
      <Row justify="center" className="d-flex align-items-center" style={{ minHeight: '100vh' }}>
        <Col lg={10} sm={24} xs={24}>
          <img src={"http://localhost:3001/rooms/" + room.image} className="roomimg2 bs1" alt={room.name} />
        </Col>

        <Col lg={10} sm={24} xs={24}>
  <div className="RoomDetailscontainer">
    <div className="roomDetailsCard">
      <Divider type="horizontal" orientation="center" className="roomimgDetails">
      <h2 class="room-info-heading">Room Informations</h2>   
  
      </Divider>
    
      <div className="room-details">
  <ul>
    <li><strong>Room Name:</strong>{room.name}</li>
    <li><strong>Room Type:</strong> {room.roomType}</li>
    <li><strong>Rent PerNight:</strong> {room.rentPerNight}</li>
    <li><strong>Number Of Beds :</strong> {room.numberOfBeds}</li>
    <li><strong>WiFi Availability:</strong> {room.wifiAvailability ? "Available" : "Not Available"}</li>
    <li><strong>AC Availability:</strong> {room.acAvailability ? "Available" : "Not Available"}</li>
    <li><strong>Room Description:</strong> {room.roomDescription}</li>
  </ul>
</div>
<Button className='RoomDetbutton'>Book Now</Button>


    </div>
  </div>
</Col>

      </Row>
      <Footer />
    </div>

    </div>
  );
};

export default RoomDetails;
