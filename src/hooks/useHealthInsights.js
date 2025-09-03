import { useState, useEffect } from "react";
import { getHealthInsights } from "../data/healthAPI";

export function useHealthInsights(patient) {
  const [insights, setInsights] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!patient) return;

    const fetchInsights = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await getHealthInsights(patient);
        setInsights(result);
      } catch (err) {
        setError(err.message);
        setInsights("⚠️ Could not generate insights.");
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [patient]);

  return { insights, loading, error };
}
