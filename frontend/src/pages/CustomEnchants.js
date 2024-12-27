import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/custom_enchants/SideBar";
import Content from "../components/custom_enchants/Content";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/custom_enchants/CustomEnchants.css";
import { triggers_nested } from "../data/triggers";

const CustomEnchants = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activePage = location.pathname.split("/")[2] || "Home";

  const sections = [
    {
      title: "Home",
    },
    {
      title: "Custom Enchant Builder"
    },
    {
      title: "Built-in Custom Enchants"
    },
    {
      title: "Commands"
    },
    {
      title: "Triggers",
      subsections: Object.keys(triggers_nested).map((category) => ({
        title: category.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()),
        subsections: triggers_nested[category].map((trigger) => ({
          title: trigger.name.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()),
        })),
      })),
    },
  ];

  const handlePageChange = (page) => {
    navigate(`/custom_enchants/${page.replace(/ /g, "_").toLowerCase()}`);
  };

  return (
    <div className="app-container">
        <Header/>
        <div className="custom-enchants-container">
            <Sidebar
                sections={sections}
                activePage={activePage}
                setActivePage={handlePageChange}
            />
            <div className="content-container">
                <Content activePage={activePage} />
            </div>
        </div>
        <Footer bgColor="#0d1117" accentColor="#30363d"/>
    </div>
    );

};

export default CustomEnchants;
