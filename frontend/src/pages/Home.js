import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Home.css";
import profilePicture from "../assets/images/portret.jpg";
import renoperfectPicture from "../assets/images/renoperfect.jpg"

const Home = () => {
    const [isIntroVisible, setIsIntroVisible] = useState(true);
    const [projectsVisible, setProjectsVisible] = useState(false);
    const projectsRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsIntroVisible(false);
        }, 2300);

        return () => clearTimeout(timer);
    }, []);

    // Initialize IntersectionObserver after intro disappears
    useEffect(() => {
        if (!isIntroVisible) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setProjectsVisible(true);
                    }
                },
                { threshold: 0.5 } // Trigger when 30% of the section is visible
            );

            if (projectsRef.current) {
                observer.observe(projectsRef.current);
            }

            return () => observer.disconnect(); // Clean up the observer
        }
    }, [isIntroVisible]); // Re-run only after `isIntroVisible` changes

    return (
        <>
            {isIntroVisible && (
                <div className="intro-screen">
                    <h1 className="intro-title-name">Timon Coucke</h1>
                    <h1 className="intro-title-port">Portfolio</h1>
                </div>
            )}
            {!isIntroVisible && (
                <div className="homepage">
                    <Header />
                    {/* About Section */}
                    <section id="about" className="about">
                        <div className="about-container">
                            <div className="about-text">
                                <h2>About Me</h2>
                                <p>
                                    Hello! I'm <strong>Timon Coucke</strong>, a 4th-year Master student at the <strong>University of Ghent (UGent)</strong>. 
                                    I also work as a freelancing software engineer.
                                </p>
                                <p>
                                    My passion lies in automating processes for companies, enabling them to operate more efficiently and effectively.
                                </p>
                                <p>
                                    In my free time, I love creating mods and plugins for a variety of games, combining my technical skills with creativity.
                                </p>    
                            </div>
                            <div className="about-image">
                                <img src={profilePicture} alt="Timon Coucke" />
                            </div>
                        </div>
                    </section>

                    <div className="divider"></div>

                    {/* Projects Section */}
                    <section
                        id="projects"
                        className={`projects ${projectsVisible ? "fade-in" : ""}`}
                        ref={projectsRef}
                    >
                        <div className="container">
                            <h2>My Projects</h2>
                            <div className="project-list">
                                {/* Project 1 */}
                                <div className="project-item">
                                    <div className="project-text">
                                        <h3>RenoPerfect Full Stack Website</h3>
                                        <p>
                                            Short description of the project. This could be a web app, game, or software you've developed.
                                        </p>
                                    </div>
                                    <div className="project-image">
                                    <img src={renoperfectPicture} alt="RenoPerfect" />
                                    </div>
                                </div>

                                {/* Project 2 */}
                                <div className="project-item">
                                    <div className="project-text">
                                        <h3>Another Project Title</h3>
                                        <p>
                                            Another project description to showcase your work. Highlight the key features or benefits.
                                        </p>
                                    </div>
                                    <div className="project-image">
                                        <img src="https://via.placeholder.com/300" alt="Project 2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <Footer />
                </div>
            )}
        </>
    );
};

export default Home;
