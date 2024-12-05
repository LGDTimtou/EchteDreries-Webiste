import React from "react";
import "../../styles/custom_enchants/Content.css";
import HomeContent from "./content_pages/HomeContent";
import CustomEnchantBuilderContent from "./content_pages/custom_enchant_builder/CustomEnchantBuilderContent";


const Content = ({ activePage}) => {
    return (
        <div className="content">
        <p>
            {activePage === "Home" && <HomeContent/>}
            {activePage === "Custom Enchant Builder" && <CustomEnchantBuilderContent/>}
            {activePage === "Services" && "Check out our Services."}
            {activePage === "Contact" && "Feel free to Contact us."}
        </p>
        </div>
    );
};

export default Content;
