import React, { useState } from "react";
import Sidebar from "../components/custom_enchants/SideBar";
import Content from "../components/custom_enchants/Content";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/custom_enchants/CustomEnchants.css";

const CustomEnchants = () => {
  const [activePage, setActivePage] = useState("Home");

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
      subsections: [
        {
          title: "Armor",
          subsections: [],
        },
        {
          title: "Account Settings",
          subsections: [],
        },
      ],
    },
  ];

  return (
    <div className="app-container">
        <Header/>
        <div className="custom-enchants-container">
            <Sidebar
                sections={sections}
                activePage={activePage}
                setActivePage={setActivePage}
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
