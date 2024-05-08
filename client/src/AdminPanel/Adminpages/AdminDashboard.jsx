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
import { useDispatch, useSelector } from "react-redux";
import recommendCarsData from "../assets/dummy-data/recommendrooms";


const AdminDash = () => {
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

  const UserStats = () => {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.auth);

    useEffect(() => {
      // dispatch(CALC_VERIFIED_USER()); // Dispatch the action directly
      //dispatch(CALC_SUSPENDED_USER()); // Dispatch the action directly
    }, [dispatch, users]);

    const { verifiedUsers, suspendedUsers } = useSelector(
      (state) => state.auth
    );
    const unverifiedUsers = users.length - verifiedUsers;

    const carObj = {
      title: "Total Rooms",
      totalNumber: rooms.length,
      icon: "ri-hotel-fill",
    };

    const tripObj = {
      title: "Total Users",
      totalNumber: users.length,
      icon: "ri-user-2-line", // Added icon for tripObj
    };

    const clientObj = {
      title: "Total Clients",
      totalNumber: "85k",
      icon: "ri-user-line",
    };

    const distanceObj = {
      title: "Total",
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
                    <h3 className="stats__title">Room Type Distribution</h3>
                    <MileChart />
                  </div>
                  <div className="stats">
                    <h3 className="stats__title">Car Stats</h3>
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

  return <UserStats />;
};

export default AdminDash;