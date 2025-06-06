import React from "react";
import "../../styles/home/HomeHeader.css";

const Header = () => {
    return (
        <header className="home-header">
            <div className="home-header-container">
                <div className="home-header-left">
                    <h1 className="name">Timon Coucke</h1>
                    <p className="tagline"><strong>Software Engineer | Computer Science @{" "}
                        <a class="base-url" href="https://www.ugent.be/en" target="_blank" rel="noopener noreferrer">
                            UGent
                        </a></strong>
                    </p>
                </div>
                <nav className="home-header-right">
                    <ul className="nav-links">
                        <li><a href="#about">About</a></li>
                        <li><a href="#projects">Projects</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;