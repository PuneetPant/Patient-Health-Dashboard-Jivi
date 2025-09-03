export const calculateHealthScore = (patient) => {
  let score = 100;

  if (patient.vitals && patient.vitals.length > 0) {
    const latest = patient.vitals[patient.vitals.length - 1];

    if (latest.heartRate < 60 || latest.heartRate > 100) score -= 10;
    if (latest.temperature < 36 || latest.temperature > 37.5) score -= 10;
    if (latest.bloodPressure) {
      const [systolic, diastolic] = latest.bloodPressure.split("/").map(Number);
      if (systolic > 140 || diastolic > 90) score -= 15;
    }
  }

  const missedMeds =
    patient.medications?.filter((m) => m.status === "missed").length || 0;
  score -= missedMeds * 5;

  const missedAppts =
    patient.appointments?.filter((a) => a.status === "missed").length || 0;
  score -= missedAppts * 10;

  // clamp between 0–100
  if (score < 0) score = 0;
  if (score > 100) score = 100;

  return score;
};
