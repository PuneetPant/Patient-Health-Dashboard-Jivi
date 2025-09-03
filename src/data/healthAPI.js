export const getHealthInsights = async (patient) => {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key=" +
        process.env.REACT_APP_GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a health assistant. Review the following patient information and provide clear, concise, and empathetic insights, give suggestions like a doctor will give.(Reply in text, no astericks).

                  ${JSON.stringify(patient, null, 2)}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No insights available."
    );
  } catch (error) {
    console.warn("Falling back to mock insights. Reason:", error.message);

    return `
    Patient ${patient.name}'s recent health summary:
    - ${
      patient.vitals?.length > 0
        ? `Most recent heart rate: ${
            patient.vitals[patient.vitals.length - 1].heartRate
          } bpm.`
        : "No vitals data available."
    }
    - ${
      patient.medications?.filter((m) => m.status === "missed").length > 0
        ? "Some medications were missed recently. Encourage adherence."
        : "Medications appear to be taken regularly."
    }
    - ${
      patient.appointments?.filter((a) => a.status === "scheduled").length > 0
        ? "Upcoming appointment is scheduled. Ensure follow-up."
        : "No upcoming appointments on record."
    }
    `;
  }
};
