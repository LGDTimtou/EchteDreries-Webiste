import React, { useState } from "react";
import Sidebar from "../components/custom_enchants/SideBar";
import Content from "../components/custom_enchants/Content";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/custom_enchants/CustomEnchants.css";

const CustomEnchants = () => {
  const [activePage, setActivePage] = useState("Home");

  return (
    <div className="app-container">
        <Header/>
        <div className="custom-enchants-container">
            <Sidebar setActivePage={setActivePage} activePage={activePage} />
            <div className="content-container">
                <Content activePage={activePage} />
            </div>
        </div>
        <Footer bgColor="#0d1117" accentColor="#30363d"/>
    </div>
    );

};

export default CustomEnchants;
