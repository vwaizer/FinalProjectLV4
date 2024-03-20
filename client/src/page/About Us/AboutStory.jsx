import React from "react";
import "./about-us-page.css";
const AboutStory = ({ content, preTitle, title, text }) => {
  return (
    <div className="section our-story">
      <div className="left-container flex-col flex-align-top gap-xs">
        <p className="pre-title">{preTitle}</p>
        <h2 className="h2">{content}</h2>
        <p className="body-bld">{title}</p>
        <p className="body">{text}</p>
      </div>
    </div>
  );
};

export default AboutStory;
