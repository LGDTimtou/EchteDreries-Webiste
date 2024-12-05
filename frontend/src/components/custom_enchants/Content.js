import React from "react";
import "../../styles/custom_enchants/Content.css";

const Content = ({ activePage}) => {
    return (
        <div className="content">
        <h1>{activePage}</h1>
        <p>
            {activePage === "Home" && "Welcome to the Home page!"}
            {activePage === "About" && "Learn more About us here."}
            {activePage === "Services" && "Check out our Services."}
            {activePage === "Contact" && "Feel free to Contact us."}
        </p>
        </div>
    );
};

export default Content;
