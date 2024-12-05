import React, { useState, useEffect, useRef } from "react";
import "../styles/home/Home.css";
import profilePicture from "../assets/images/portret.jpg";
import renoperfectPicture from "../assets/images/renoperfect.jpg";
import ninalottesPicture from "../assets/images/ninalottes_health.jpg";
import customEnchantsPicture from "../assets/images/custom_enchants.gif";
import Project from "../components/home/Project";
import Header from "../components/home/HomeHeader";
import Footer from "../components/Footer";

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

    useEffect(() => {
        if (!isIntroVisible) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setProjectsVisible(true);
                    }
                },
                { threshold: 0.5 }
            );

            if (projectsRef.current) {
                observer.observe(projectsRef.current);
            }

            return () => observer.disconnect();
        }
    }, [isIntroVisible]);

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

                    <section
                        id="projects"
                        className={`projects ${projectsVisible ? "fade-in" : ""}`}
                        ref={projectsRef}
                    >
                        <div className="container">
                            <h2>My Projects</h2>
                            <div className="project-list">
                                <Project
                                    title="Full stack website: RenoPerfect"
                                    description="Short description of the project. This could be a web app, game, or software you've developed."
                                    imageUrl={renoperfectPicture}
                                    link="https://renoperfect.be"
                                    altText="RenoPerfect"
                                />
                                <Project
                                    title="Frontend website: Ninalottes Health"
                                    description="Another project description to showcase your work. Highlight the key features or benefits."
                                    imageUrl={ninalottesPicture}
                                    link="https://ninalotteshealth.com"
                                    altText="NinalottesHealth"
                                />
                                <Project
                                    title="Minecraft plugin: ⚡Custom Enchants⚡"
                                    description="Another project description to showcase your work. Highlight the key features or benefits."
                                    imageUrl={customEnchantsPicture}
                                    link="https://www.spigotmc.org/resources/⚡advanced⚡-custom-enchants⚡-create-new-enchants.102514/"
                                    altText="CustomEnchants"
                                />
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
