import React from "react";
import "../styles/home/Footer.css";

const Footer = ({ bgColor, accentColor }) => {
    const footerStyle = {
        "--bg-color": bgColor,
        "--accent-color": accentColor,
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer" style={footerStyle}>
            <p>&copy; {currentYear} Timon Coucke. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
