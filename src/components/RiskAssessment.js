import React from "react";

const RiskAssessment = ({ vitals }) => {
  if (!vitals || vitals.length === 0) return null;

  const latest = vitals[vitals.length - 1];
  const risks = [];

  if (latest.heartRate > 120) risks.push("⚠️ High heart rate detected");
  if (latest.temperature > 38) risks.push("⚠️ Fever risk detected");
  if (latest.bloodPressure) {
    const [sys, dia] = latest.bloodPressure.split("/").map(Number);
    if (sys > 140 || dia > 90) risks.push("⚠️ Hypertension risk detected");
  }

  return (
    <div className="card">
      <h3>Risk Assessment</h3>
      {risks.length > 0 ? (
        <ul>
          {risks.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      ) : (
        <p>✅ No immediate health risks detected.</p>
      )}
    </div>
  );
};

export default RiskAssessment;
