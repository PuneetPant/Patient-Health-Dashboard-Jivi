import { useEffect } from "react";
import { toast } from "react-toastify";

const SmartAlerts = ({ patient }) => {
  useEffect(() => {
    if (!patient) return;

    const missedMeds = patient.medications.filter((m) => m.status === "missed");
    if (missedMeds.length > 0) {
      toast.warn(
        `💊 Missed medications: ${missedMeds.map((m) => m.name).join(", ")}`,
        {
          position: "top-right",
          autoClose: 5000,
        }
      );
    }

    const now = new Date();
    const upcoming = patient.appointments.filter((appt) => {
      const apptDate = new Date(`${appt.date}T${appt.time}`);
      const diff = apptDate - now;
      return diff > 0 && diff <= 24 * 60 * 60 * 1000;
    });

    if (upcoming.length > 0) {
      toast.info(
        `📅 Upcoming appointment(s): ${upcoming
          .map((a) => `${a.doctor} on ${a.date} at ${a.time}`)
          .join(", ")}`,
        {
          position: "top-right",
          autoClose: 5000,
        }
      );
    }
  }, [patient]);

  return null;
};

export default SmartAlerts;
