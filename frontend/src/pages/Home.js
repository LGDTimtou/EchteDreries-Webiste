import React, { useState, useEffect, useRef } from "react";
import "../styles/home/Home.css";
import profilePicture from "../assets/images/portret.jpg";
import renoperfectPicture from "../assets/images/renoperfect.jpg";
import customEnchantsPicture from "../assets/images/custom_enchants.png";
import Project from "../components/home/Project";
import Header from "../components/home/HomeHeader";
import Footer from "../components/Footer";
import ProjectPopup from "../components/home/ProjectPopup";
import Contact from "../components/home/Contact";

const projects = {
  renoperfect: {
    title: "Full Stack Application: RenoPerfect",
    short_description:
      "✨ Allows employees to access their daily assigned projects, view essential details, log work hours, upload progress photos... \n ✨ All data automatically gets synced with the company’s database and Dropbox.",
    description:
      "Its a custom-built full-stack web application designed to optimize project management for RenoPerfect, a construction company. The platform connects the company’s database with an API, allowing employees to easily access their daily project assignments, review key information (such as required materials, images, and mandates), and log their work hours and used materials. \n\nAt the end of each workday, employees can upload photos of their completed work, which are automatically stored in the company’s Dropbox, ensuring organized and secure documentation. Additionally, via web scraping it extracts relevant work orders from insurance companies, integrating them directly into the database—eliminating the need for manual input.",
    imageUrl: renoperfectPicture,
    link: "https://renoperfect.be",
    altText: "RenoPerfect",
  },
  custom_enchants: {
    title: "Minecraft Plugin:⚡Custom Enchants⚡",
    short_description:
      "✨ Allows server owners to create custom enchantments functioning just like vanilla enchantments. With an intuitive online enchantment builder, players can design new enchantments effortlessly. \n✨ Also includes a variety of pre-made custom enchantments!",
    description:
      "Allows server owners to create custom enchantments functioning just like vanilla enchantments. \n\nUnlike other plugins that require complex configuration files, this plugin offers an easy-to-use online enchantment builder, making enchantment creation as simple as possible. \n\nWith just a few clicks, players can define enchantment triggers, effects, and mechanics that work exactly like standard Minecraft enchantments. \n\nThe plugin also comes with a large selection of pre-configured custom enchantments, ready to be used immediately on any server. \n\n🔹 Key Features: \n✅ Intuitive Online Enchantment Builder \n✅ Works with anvils, enchanting tables, books... \n✅ Pre-Made Custom Enchants \n✅ Server-Friendly & Optimized \n\nWhether you're looking to enhance your Minecraft survival experience, add exciting features to your SMP, or give server owners more creative control, Custom Enchants provides a high level of customization and ease of use! ⚡",
    imageUrl: customEnchantsPicture,
    link: "https://timonc.be/custom_enchants",
    altText: "CustomEnchants",
  },
};

const Home = () => {
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
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
        { threshold: 0.2 }
      );

      if (projectsRef.current) {
        observer.observe(projectsRef.current);
      }

      return () => observer.disconnect();
    }
  }, [isIntroVisible]);

  const openPopup = (project) => {
    setSelectedProject(project);
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setSelectedProject(null);
  };

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
                  Hello! I'm <strong>Timon Coucke</strong>, a 4th-year Master
                  student at the <strong>University of Ghent (UGent)</strong>. I
                  also work as a freelancing software engineer.
                </p>
                <p>
                  My passion lies in automating processes for companies,
                  enabling them to operate more efficiently and effectively.
                </p>
                <p>
                  In my free time, I love creating mods and plugins for a
                  variety of games, combining my technical skills with
                  creativity.
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
                {Object.entries(projects).map(([key, project]) => (
                  <Project
                    key={key}
                    title={project.title}
                    description={project.short_description}
                    imageUrl={project.imageUrl}
                    link={project.link}
                    altText={project.altText}
                    onReadMore={() => openPopup(project)}
                  />
                ))}
              </div>
            </div>
          </section>

          <div className="divider"></div>

          <Contact />

          <ProjectPopup
            project={selectedProject}
            isVisible={isPopupVisible}
            onClose={closePopup}
          />

          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;
