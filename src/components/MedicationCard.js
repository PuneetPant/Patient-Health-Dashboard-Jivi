import React, { useState } from "react";
import { validateFields } from "../utils/validators";
import { useLocalStorage } from "../hooks/useLocalStorage";

const MedicationCard = ({ medications, patientId }) => {
  const [meds, setMeds] = useLocalStorage(
    `medications-${patientId}`,
    medications || []
  );
  const [newMed, setNewMed] = useState({ name: "", dosage: "", frequency: "" });
  const [errors, setErrors] = useState({});

  const addMedication = () => {
    const rules = {
      name: { required: true },
      dosage: {
        required: true,
        pattern: /^[0-9]+(mg|IU|units)?$/i,
        message: "Enter a valid dosage (e.g., 20mg, 500IU).",
      },
      frequency: { required: true },
    };

    const validationErrors = validateFields(newMed, rules);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setMeds([...meds, { ...newMed, status: "scheduled" }]);
    setNewMed({ name: "", dosage: "", frequency: "" });
    setErrors({});
  };

  const toggleStatus = (index) => {
    setMeds(
      meds.map((m, i) =>
        i === index
          ? { ...m, status: m.status === "taken" ? "missed" : "taken" }
          : m
      )
    );
  };

  return (
    <div className="card">
      <h3>Medications</h3>
      <ul>
        {meds.map((med, idx) => (
          <li key={idx} className={med.status}>
            {med.name} - {med.dosage} ({med.frequency}) [{med.status}]
            <button onClick={() => toggleStatus(idx)}>
              Mark {med.status === "taken" ? "Missed" : "Taken"}
            </button>
          </li>
        ))}
      </ul>

      <h4>Add New Prescription</h4>
      <div className="form-group">
        <input
          type="text"
          placeholder="Medication Name"
          value={newMed.name}
          onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="Dosage"
          value={newMed.dosage}
          onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
        />
        {errors.dosage && <span className="error">{errors.dosage}</span>}
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="Frequency"
          value={newMed.frequency}
          onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
        />
        {errors.frequency && <span className="error">{errors.frequency}</span>}
      </div>

      <button onClick={addMedication}>Add Medication</button>
    </div>
  );
};

export default MedicationCard;
