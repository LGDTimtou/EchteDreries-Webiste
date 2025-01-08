import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/custom_enchants/SideBar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/custom_enchants/CustomEnchants.css";
import { triggers_nested } from "../data/triggers";
import HomeContent from "../components/custom_enchants/content_pages/HomeContent";
import CustomEnchantBuilderContent from "../components/custom_enchants/content_pages/custom_enchant_builder/CustomEnchantBuilderContent";
import TriggerContent from "../components/custom_enchants/content_pages/TriggerContent";

const CustomEnchants = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activePage = location.pathname.split("/")[2] || "home";

  const sections = [
    {
      title: "Home",
      link: "home",
      component: HomeContent,
    },
    {
      title: "Custom Enchant Builder",
      link: "custom_enchant_builder",
      component: CustomEnchantBuilderContent,
    },
    //{
    //  title: "Built-in Custom Enchants",
    //  link: "built_in",
    //  component: null,
    //},
    //{
    //  title: "Commands",
    //  link: "commands",
    //  component: null,
    //},
    {
      title: "Triggers",
      subsections: Object.keys(triggers_nested).map((category) => ({
        title: category.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()),
        subsections: triggers_nested[category].map((trigger) => {
          const triggerName = trigger.name.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
          return {
            title: triggerName,
            link: `triggers/${category}/${trigger.name}`,
            component: TriggerContent,
            props: { category, triggerName: triggerName, trigger },
          }
        }),
      })),
    },
  ];

  const handlePageChange = (page) => {
    navigate(`/custom_enchants/${page}`);
  };

  const renderRoutes = (routes) =>
    routes.map((route, index) => {
      if (route.subsections) {
        return renderRoutes(route.subsections);
      }
      return (
        <Route
          key={index}
          path={route.link}
          element={React.createElement(route.component, route.props || {})}
        />
      );
    });

  return (
    <div className="app-container">
      <Header />
      <div className="custom-enchants-container">
        <div className="sidebar-container">
          <Sidebar
            sections={sections}
            activePage={activePage}
            setActivePage={handlePageChange}
          />
        </div>
        <div className="content-container">
          <div className="content-page">
            <Routes>
              {renderRoutes(sections)}
            </Routes>
          </div>
          <div className="empty-div"/>

          <Footer bgColor="#0d1117" accentColor="#30363d" />
        </div>
      </div>
      
    </div>
  );
};

export default CustomEnchants;
