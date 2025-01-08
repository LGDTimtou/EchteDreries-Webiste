import React from "react";
import PropTypes from "prop-types";
import "../../styles/home/Project.css";

const Project = ({ title, description, imageUrl, link, altText }) => {
    return (
        <div className="project-item">
            <div className="project-text">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
            <div className="project-image">
                <a href={link} target="_blank" rel="noopener noreferrer">
                    <img src={imageUrl} alt={altText} />
                </a>
            </div>
        </div>
    );
};

Project.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
};

export default Project;
