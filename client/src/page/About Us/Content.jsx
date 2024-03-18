import React from 'react'
import "./about-us-page.css";
const Content = ({content, title}) => {
  return (
    <div className="md-spc gap-ms flex-col ivory-bg">
        <h2 className="h3">{content}</h2>
        <p className="body">{title}</p>
    </div>
  )
}

export default Content