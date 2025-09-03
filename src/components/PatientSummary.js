import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { calculateHealthScore } from "../utils/healthScore";
import { useHealthInsights } from "../hooks/useHealthInsights";

const PatientSummary = ({ patient }) => {
  const summaryRef = useRef();
  const { insights, loading, error } = useHealthInsights(patient);

  const downloadPDF = async () => {
    const element = summaryRef.current;

    const clone = element.cloneNode(true);
    clone.style.width = "800px";
    clone.style.position = "absolute";
    clone.style.left = "-9999px";
    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    document.body.removeChild(clone);

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);

    const imgWidth = pageWidth - 20;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save(`${patient.name}_summary.pdf`);
  };

  const score = calculateHealthScore(patient);

  return (
    <div className="card">
      <h3>Patient Health Summary</h3>
      <div ref={summaryRef} className="summary-content">
        <h2>{patient.name}</h2>
        <p>Status: {patient.status}</p>
        <p>Age: {patient.age}</p>
        <p>
          Health Score: <strong>{score}</strong>/100
        </p>

        <h4>Recent Vitals</h4>
        <ul>
          {patient.vitals.slice(-3).map((v, i) => (
            <li key={i}>
              {v.date} – HR: {v.heartRate}, Temp: {v.temperature}°C, BP:{" "}
              {v.bloodPressure}, Weight: {v.weight}kg
            </li>
          ))}
        </ul>

        <h4>Medications</h4>
        <ul>
          {patient.medications.map((m, i) => (
            <li key={i}>
              {m.name} – {m.dosage} ({m.frequency}) [{m.status}]
            </li>
          ))}
        </ul>

        <h4>Appointments</h4>
        <ul>
          {patient.appointments.map((a, i) => (
            <li key={i}>
              {a.date} {a.time} – {a.doctor} ({a.status})
            </li>
          ))}
        </ul>

        <h4>AI Recommendations</h4>
        {loading && <p>Analyzing patient data...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && <p>{insights}</p>}
      </div>

      <button disabled={loading} onClick={downloadPDF} className="insights-btn">
        📄 Download Summary PDF
      </button>
    </div>
  );
};

export default PatientSummary;
