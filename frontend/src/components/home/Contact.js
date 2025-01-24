import React from "react";
import "../../styles/home/Contact.css";
import { FaDiscord, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Contact = () => {
    return (
        <section id="contact" className="contact">
            <div className="container">
                <h2>Contact Me</h2>
                <div className="contact-list">
                    <a href="https://discord.com/users/361236572055797760" target="_blank" rel="noopener noreferrer" className="contact-item">
                        <FaDiscord className="contact-icon" />
                        <span>timtou</span>
                    </a>
                    <a href="https://www.linkedin.com/in/timon-coucke-155ab61a3/" target="_blank" rel="noopener noreferrer" className="contact-item">
                        <FaLinkedin className="contact-icon" />
                        <span>Timon Coucke</span>
                    </a>
                    <a href="mailto:coucketimon@gmail.com" className="contact-item">
                        <FaEnvelope className="contact-icon" />
                        <span>coucketimon@gmail.com</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
