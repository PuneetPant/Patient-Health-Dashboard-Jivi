import React from "react";
import { calculateHealthScore } from "../utils/healthScore";

const PatientHeader = ({ patient, handleInsights }) => {
  const score = calculateHealthScore(patient);

  return (
    <div className="patient-header">
      <img src={patient.photo} alt={patient.name} className="patient-photo" />
      <div>
        <h2>{patient.name}</h2>
        <p>Status: {patient.status}</p>
        <p>Age: {patient.age}</p>
        <p className="health-score">
          Health Score: <strong>{score}</strong>/100
        </p>
        <button className="insights-btn" onClick={handleInsights}>
          🤖 AI Health Insights
        </button>
      </div>
    </div>
  );
};

export default PatientHeader;
