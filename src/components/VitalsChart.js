import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const VitalsChart = ({ vitals }) => (
  <div className="card">
    <h3>Vital Signs</h3>
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={vitals}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="heartRate"
            stroke="#ff0000"
            name="Heart Rate"
          />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#0000ff"
            name="Temperature"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default VitalsChart;
