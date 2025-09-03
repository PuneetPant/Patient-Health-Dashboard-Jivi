import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} Patient Health Dashboard · All Rights
        Reserved
      </p>
    </footer>
  );
};

export default Footer;
