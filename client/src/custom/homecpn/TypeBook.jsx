import React from "react";
import "./style.css";

const TypeBook = ({ href, image, alt, title }) => {
  return (
    <div className="type-book">
      <a href={href}>
        <img src={image} alt={alt} />
        <div className="description">
          <h2>{title}</h2>
        </div>
      </a>
    </div>
  );
};

export default TypeBook;
