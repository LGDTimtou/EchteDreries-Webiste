import React from "react";
import "./styles/Homepage.css";

const Homepage = () => {
    return (
        <div className="homepage">
            {/* Header Section */}
            <header className="header">
                <div className="container">
                    <h1 className="name">Timon Coucke</h1>
                    <p className="tagline">Computer Science Enthusiast | UGent</p>
                    <nav>
                        <ul className="nav-links">
                            <li><a href="#about">About</a></li>
                            <li><a href="#projects">Projects</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* About Section */}
            <section id="about" className="about">
                <div className="container">
                    <h2>About Me</h2>
                    <p>
                        Hello! I'm <strong>Timon Coucke</strong>. I studied at College Sint Rembert Torhout
                        where I focused on Wetenschappen Wiskunde (8 uur wiskunde). Currently, I'm in my
                        fourth year studying Computer Science at UGent. I have a passion for creating
                        unique, modern, and functional applications.
                    </p>
                    <p>This section can include your skills, interests, or other personal details.</p>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="projects">
                <div className="container">
                    <h2>My Projects</h2>
                    <div className="project-list">
                        {/* Placeholder for Projects */}
                        <div className="project-card">
                            <div className="project-image">
                                <img src="https://via.placeholder.com/300" alt="Project Placeholder" />
                            </div>
                            <div className="project-details">
                                <h3>Project Title</h3>
                                <p>Short description of the project. This could be a web app, game, or software you've developed.</p>
                            </div>
                        </div>
                        <div className="project-card">
                            <div className="project-image">
                                <img src="https://via.placeholder.com/300" alt="Project Placeholder" />
                            </div>
                            <div className="project-details">
                                <h3>Project Title</h3>
                                <p>Another project description to showcase your work.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="contact">
                <div className="container">
                    <h2>Contact Me</h2>
                    <p>Feel free to reach out to me through the following channels:</p>
                    <ul className="social-links">
                        <li><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a></li>
                        <li><a href="mailto:your.email@example.com">Email</a></li>
                        <li><a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a></li>
                    </ul>
                    <form className="contact-form">
                        <input type="text" placeholder="Your Name" required />
                        <input type="email" placeholder="Your Email" required />
                        <textarea placeholder="Your Message" required></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2024 Timon Coucke. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Homepage;
