import React, { useState, useRef, useEffect } from "react";
import Button from "./button";
import Dropdown from "../dropdown/dropdown";
import "./dropdown-button.css";

const DropdownButton = ({
  text = "",
  onClick = () => {},
  type,
  btnStyle = "",
  disabled,
  iconL = "",
  iconR = "",
  iconSide = "left",
  textStyle = "",
  frameStyle = "",
  dropdownStyle = "",
  method,
  value
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(timerRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 80);
  };

  return (
    <div
      className={`dropdown-btn ${isDropdownOpen ? "fadeIn" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Button
        text={text}
        onClick={onClick}
        type={type}
        btnStyle={btnStyle}
        disabled={disabled}
        iconL={iconL}
        iconR={iconR}
        iconSide={iconSide}
        textStyle={textStyle}
        frameStyle={frameStyle}
      />
      {isDropdownOpen && (
        <Dropdown
          dropdownStyle={dropdownStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          method={method}
          value={value}
        />
      )}
    </div>
  );
};

export default DropdownButton;
