import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import "../styles/dashboard.css";
import SingleCard from "../AdminComponents/reuseable/SingleCard";
import MileChart from "../charts/MileChart";
import CarStatsChart from "../charts/CarStatsChart";
import RecommendCarCard from "../AdminComponents/UI/RecommendCarCard";
import Sidebar from '../AdminComponents/Sidebar/Sidebar';
import TopNav from '../AdminComponents/TopNav/TopNav';
import recommendCarsData from "../assets/dummy-data/recommendCars";

const AdminDash = () => {
  const [rooms, setRooms] = useState([]);

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

  const carObj = {
    title: "Total Rooms",  // Updated title
    totalNumber: rooms.length,  // Display the total number of rooms
    icon: "ri-hotel-fill",
  };

  const tripObj = {
    title: "Daily Trips",
    totalNumber: 1697,
    icon: "ri-steering-2-line",
  };

  const clientObj = {
    title: "Clients Annually",
    totalNumber: "85k",
    icon: "ri-user-line",
  };

  const distanceObj = {
    title: "Kilometers Daily",
    totalNumber: 2167,
    icon: "ri-timer-flash-line",
  };

  return (

    <div className="layout">
      <Sidebar />
      <div className="main__layout">
        <TopNav />

    <div>
      <div className="dashboard">
     
        <div className="dashboard__wrapper">
        
          <div className="dashboard__cards">
          
            <SingleCard item={carObj} />
            <SingleCard item={tripObj} />
            <SingleCard item={clientObj} />
            <SingleCard item={distanceObj} />
          </div>
          <div className="statics">
            <div className="stats">
              <h3 className="stats__title">Room Rent Distribution</h3>
              <MileChart />
            </div>
            <div className="stats">
              <h3 className="stats__title">Maxcount Analysis</h3>
              <CarStatsChart />
            </div>
          </div>
          <div className="recommend__cars-wrapper">
            {recommendCarsData.map((item) => (
              <RecommendCarCard item={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default AdminDash;
