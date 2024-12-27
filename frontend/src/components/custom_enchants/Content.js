import React from "react";
import "../../styles/custom_enchants/CustomEnchants.css";
import HomeContent from "./content_pages/HomeContent";
import CustomEnchantBuilderContent from "./content_pages/custom_enchant_builder/CustomEnchantBuilderContent";




const Content = ({ activePage}) => {
    return (
        <div className="content-page">
            {activePage === "home" && <HomeContent/>}
            {activePage === "custom_enchant_builder" && <CustomEnchantBuilderContent/>}
        </div>
    );
};

export default Content;
