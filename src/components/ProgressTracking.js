import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ProgressTracking = ({ vitals }) => {
  return (
    <div className="card">
      <h3>Progress Tracking</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={vitals}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="heartRate" stroke="#8884d8" />
          <Line type="monotone" dataKey="temperature" stroke="#82ca9d" />
          <Line type="monotone" dataKey="weight" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressTracking;
