import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "../../styles/custom_enchants/SideBar.css";

const Sidebar = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sections = [
    {
      title: "Healthy contributions",
      items: ["Item 1", "Item 2", "Item 3"],
    },
    {
      title: "Issue & PR templates",
      items: ["Item 4", "Item 5"],
    },
    {
      title: "Moderation",
      items: ["Item 6", "Item 7"],
    },
    {
      title: "Maintaining safety",
      items: ["Item 8"],
    },
    {
      title: "Using wikis",
      items: [
        "About wikis",
        "Manage wiki pages",
        "Create footer or sidebar",
        "Editing wiki content",
        "View a history of changes",
        "Change access permissions",
        "Disabling wikis",
      ],
    },
  ];

  return (
    <div className="sidebar">
      {sections.map((section, index) => (
        <div key={index} className="sidebar-section">
          <div
            className="sidebar-section-title"
            onClick={() => toggleSection(index)}
          >
            <span>{section.title}</span>
            <FontAwesomeIcon
              icon={openSections[index] ? faChevronDown : faChevronRight}
              className="toggle-icon"
            />
          </div>
          {openSections[index] && (
            <div className="sidebar-section-items">
              {section.items.map((item, i) => (
                <div key={i} className="sidebar-item">
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;