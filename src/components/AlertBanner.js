import React from "react";

const AlertBanner = ({ vitals }) => {
  const abnormal = vitals.find((v) => v.heartRate > 100 || v.temperature > 100);
  return abnormal ? (
    <div className="alert-banner">
      ⚠️ Critical Alert: HR {abnormal.heartRate}, Temp {abnormal.temperature}
    </div>
  ) : null;
};

export default AlertBanner;
