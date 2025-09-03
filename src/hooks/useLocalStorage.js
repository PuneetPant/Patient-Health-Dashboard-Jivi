import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  const readValue = () => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);

      return Array.isArray(initialValue)
        ? JSON.parse(JSON.stringify(initialValue))
        : typeof initialValue === "object" && initialValue !== null
        ? { ...initialValue }
        : initialValue;
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return initialValue;
    }
  };

  const [value, setValue] = useState(readValue);

  useEffect(() => {
    setValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [key, value]);

  return [value, setValue];
}
