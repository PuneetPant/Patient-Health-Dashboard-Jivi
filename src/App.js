import React from "react";
import "./index.css";
import HealthDashboard from "./components/HealthDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <HealthDashboard />
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;
