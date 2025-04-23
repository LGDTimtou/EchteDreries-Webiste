import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/custom_enchants/CustomEnchants.css";
import { command_parameters } from "../../../data/commandParameters";
import { yamlToJson } from "../../../util/yamlParser";

const TriggerContent = ({ subcommand }) => {
    const navigate = useNavigate();


    return (
      <div>
        <p className="content-intro">SubCommand Specifications</p>
        
        <div className="content-box">
          <h2 className="content-box-title"></h2>
        </div>
      
      </div>
    );
  };

export default TriggerContent;