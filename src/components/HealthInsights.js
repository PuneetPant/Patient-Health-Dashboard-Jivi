import React from "react";
import { useHealthInsights } from "../hooks/useHealthInsights";

const HealthInsights = ({ patient }) => {
  const { insights, loading, error } = useHealthInsights(patient);

  return (
    <div className="card">
      <h3>AI Health Insights</h3>
      {loading && <p>Analyzing patient data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && <p>{insights}</p>}
      <small className="disclaimer">
        ⚠️ AI-generated. Not a substitute for professional medical advice.
      </small>
    </div>
  );
};

export default HealthInsights;
