import React, { useState } from "react";

const PatientList = ({ patients, onSelect, selectedId }) => {
  const [search, setSearch] = useState("");

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.status.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(id);
    }
  };

  return (
    <div className="patient-list" role="navigation" aria-label="Patient List">
      <h3 id="patient-list-heading">Patients</h3>
      <input
        type="text"
        placeholder="Search by name or status..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
        aria-label="Search patients by name or status"
      />
      <ul role="list" aria-labelledby="patient-list-heading">
        {filtered.map((p) => (
          <li
            key={p.id}
            role="button"
            tabIndex={0}
            aria-pressed={selectedId === p.id}
            aria-label={`Select patient ${p.name}, status ${p.status}`}
            className={selectedId === p.id ? "selected" : ""}
            onClick={() => onSelect(p.id)}
            onKeyDown={(e) => handleKeyDown(e, p.id)}
          >
            <img
              src={p.photo}
              alt={`Profile of ${p.name}`}
              className="list-photo"
            />
            <span>
              {p.name} ({p.status})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;
