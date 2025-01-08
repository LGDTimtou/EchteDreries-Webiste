import React from "react";
import "../styles/Header.css";
import profilePicture from "../assets/images/portret.jpg";

const Header = ( {pageName} ) => {
    return (
        <header className="header">
            <div className="header-left">
                <img src={profilePicture} alt="Profile" className="header-logo" />
                <h1 className="header-title">Timon Coucke</h1>
            </div>
            <div className="header-center">
                <h1 className="header-title">⚡Custom Enchantments⚡</h1>
            </div>
            <div className="header-right">

            </div>
        </header>
    );
};

export default Header;
