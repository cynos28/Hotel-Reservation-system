import React from "react";

import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";

import RoomData from "../assets/dummy-data/roomStatics";

const mileChart = () => {
  const roomData = RoomData(); 
  return (
    <ResponsiveContainer width="100%">
      <BarChart data={roomData}>
        <XAxis dataKey="name" stroke="#2884ff" />
        <Bar dataKey="roomStats" stroke="#2884ff" fill="#2884ff" barSize={30} />

        <Tooltip wrapperClassName="tooltip__style" cursor={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default mileChart;
