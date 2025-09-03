import React, { useState } from "react";
import { validateFields } from "../utils/validators";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AppointmentList = ({ appointments, patientId }) => {
  const [appts, setAppts] = useLocalStorage(
    `appointments-${patientId}`,
    appointments || []
  );
  const [newAppt, setNewAppt] = useState({ date: "", time: "", doctor: "" });
  const [errors, setErrors] = useState({});

  const addAppointment = () => {
    const rules = {
      date: { required: true },
      time: { required: true },
      doctor: { required: true },
    };

    let validationErrors = validateFields(newAppt, rules);

    if (
      !validationErrors.date &&
      new Date(newAppt.date) < new Date().setHours(0, 0, 0, 0)
    ) {
      validationErrors.date =
        "Appointment date must be today or in the future.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setAppts([...appts, { ...newAppt, status: "scheduled" }]);
    setNewAppt({ date: "", time: "", doctor: "" });
    setErrors({});
  };

  const upcoming = appts.filter((a) => new Date(a.date) >= new Date());
  const history = appts.filter((a) => new Date(a.date) < new Date());

  return (
    <div className="card">
      <h3>Appointments</h3>

      <h4>Upcoming</h4>
      <ul>
        {upcoming.map((appt, i) => (
          <li key={i} className={appt.status}>
            {appt.date} at {appt.time} - {appt.doctor} ({appt.status})
          </li>
        ))}
      </ul>

      <h4>History</h4>
      <ul>
        {history.map((appt, i) => (
          <li key={i} className={appt.status}>
            {appt.date} at {appt.time} - {appt.doctor} ({appt.status})
          </li>
        ))}
      </ul>

      <h4>Schedule New</h4>
      <div className="form-group">
        <input
          type="date"
          value={newAppt.date}
          onChange={(e) => setNewAppt({ ...newAppt, date: e.target.value })}
        />
        {errors.date && <span className="error">{errors.date}</span>}
      </div>

      <div className="form-group">
        <input
          type="time"
          value={newAppt.time}
          onChange={(e) => setNewAppt({ ...newAppt, time: e.target.value })}
        />
        {errors.time && <span className="error">{errors.time}</span>}
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="Doctor"
          value={newAppt.doctor}
          onChange={(e) => setNewAppt({ ...newAppt, doctor: e.target.value })}
        />
        {errors.doctor && <span className="error">{errors.doctor}</span>}
      </div>

      <button onClick={addAppointment}>Add Appointment</button>
    </div>
  );
};

export default AppointmentList;
