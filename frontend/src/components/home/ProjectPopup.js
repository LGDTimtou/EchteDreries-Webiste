import React from "react";
import "../../styles/home/ProjectPopup.css";

const ProjectPopup = ({ project, isVisible, onClose }) => {
    if (!isVisible || !project) return null;

    return (
        <div className="popup-overlay show" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>{project.title}</h2>
                <img src={project.imageUrl} alt={project.altText} />
                <div className="popup-description">
                    {project.description}
                </div>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                    Visit Project
                </a>
            </div>
        </div>
    );
};

export default ProjectPopup;