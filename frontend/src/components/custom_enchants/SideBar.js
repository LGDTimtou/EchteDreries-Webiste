import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "../../styles/custom_enchants/SideBar.css";

const Sidebar = ({ sections, activePage, setActivePage }) => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleItemClick = (section) => {
    setActivePage(section.link);
  };

  const renderSections = (sections, parentIndex = "", level = 0) =>
    sections.map((section, index) => {
      const currentIndex = parentIndex ? `${parentIndex}-${index}` : `${index}`;
      const isActive = activePage === section.title;

      return (
        <div key={currentIndex} className={`sidebar-section level-${level}`}>
          <div
            className={`sidebar-section-title ${isActive ? "active" : ""
              } level-${level}`}
            onClick={() => {
              if (section.subsections && section.subsections.length > 0) {
                toggleSection(currentIndex);
              } else {
                handleItemClick(section);
              }
            }}
          >
            <span>{section.title}</span>
            {section.subsections && section.subsections.length > 0 && (
              <FontAwesomeIcon
                icon={openSections[currentIndex] ? faChevronDown : faChevronRight}
                className="toggle-icon"
              />
            )}
          </div>
          {openSections[currentIndex] && section.subsections && (
            <div className="sidebar-section-items">
              {renderSections(section.subsections, currentIndex, level + 1)}
            </div>
          )}
        </div>
      );
    });

  return <div className="sidebar">{renderSections(sections)}</div>;
};

export default Sidebar;
