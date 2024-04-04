import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RoomData = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/getall');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching room data:', error);
        // Handle error
      }
    };

    fetchRooms();
  }, []);

  const roomData = [
    {
      name: "Standard",
      roomStats: rooms.filter(room => room.roomType === "Standard").length,
    },
    {
      name: "Deluxe Room",
      roomStats: rooms.filter(room => room.roomType === "Deluxe Room").length,
    },
    {
      name: "Suite",
      roomStats: rooms.filter(room => room.roomType === "Suite").length,
    },
    {
      name: "Family Room",
      roomStats: rooms.filter(room => room.roomType === "Family Room").length,
    },
    {
      name: "Luxury",
      roomStats: rooms.filter(room => room.roomType === "Luxury").length,
    },
    {
      name: "Villa",
      roomStats: rooms.filter(room => room.roomType === "Villa").length,
    },
  ];

  return roomData;
};

export default RoomData;
