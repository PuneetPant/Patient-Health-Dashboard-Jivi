import React, { useEffect, useState, lazy, Suspense, useCallback } from "react";
import PatientList from "./PatientList";
import PatientHeader from "./PatientHeader";
import VitalsChart from "./VitalsChart";
import MedicationCard from "./MedicationCard";
import AppointmentList from "./AppointmentList";
import AlertBanner from "./AlertBanner";
import RiskAssessment from "./RiskAssessment";
import ProgressTracking from "./ProgressTracking";
import data from "../data/mockData.json";
import Footer from "./Footer";
import SmartAlerts from "./SmartAlerts";
import PatientSummary from "./PatientSummary";

const HealthInsights = lazy(() => import("./HealthInsights"));

const HealthDashboard = () => {
  const [patients] = useState(data.patients);
  const [selectedId, setSelectedId] = useState(patients[0].id);

  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem("darkMode");
    return storedMode ? JSON.parse(storedMode) : false;
  });

  const [isInsightsOpen, setIsInsightsOpen] = useState(false);

  const selectedPatient = patients.find((p) => p.id === selectedId);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    document.body.classList.toggle("light", !darkMode);

    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleInsights = useCallback(() => {
    setIsInsightsOpen(true);
  }, []);

  return (
    <div className={darkMode ? "dashboard dark" : "dashboard light"}>
      <PatientList
        patients={patients}
        onSelect={setSelectedId}
        selectedId={selectedId}
      />
      <div className="main-content">
        <div className="theme-toggle">
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <PatientHeader
          patient={selectedPatient}
          handleInsights={handleInsights}
        />
        <AlertBanner vitals={selectedPatient.vitals} />
        <SmartAlerts patient={selectedPatient} />
        <VitalsChart vitals={selectedPatient.vitals} />

        <div className="grid">
          <MedicationCard
            medications={selectedPatient.medications}
            patientId={selectedPatient.id}
          />
          <AppointmentList
            appointments={selectedPatient.appointments}
            patientId={selectedPatient.id}
          />
        </div>

        <RiskAssessment vitals={selectedPatient.vitals} />
        <ProgressTracking vitals={selectedPatient.vitals} />
        <PatientSummary patient={selectedPatient} />
        <Footer />
      </div>

      {isInsightsOpen && (
        <div className="modal-overlay" onClick={() => setIsInsightsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setIsInsightsOpen(false)}
            >
              ✖
            </button>
            <Suspense fallback={<p>Loading AI Insights module...</p>}>
              <HealthInsights
                key={selectedPatient.id}
                patient={selectedPatient}
              />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthDashboard;
