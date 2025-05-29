import React from "react";
import InputField from "./InputField";

const SliderField = ({
  label,
  description,
  name,
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
}) => {
  return (
    <div className="slider-container">
      <InputField
        label={label}
        description={description}
        placeholder=""
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
      ></InputField>
      <input
        type="range"
        className="slider-input"
        min={min}
        max={max}
        step={step}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SliderField;
