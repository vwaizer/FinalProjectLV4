import React from "react";
import Layout from "../../layout/Layout";
import image from "../../assets/livraria-lello.jpg";
import './about-us-page.css'
const AboutUsPage = () => {
  return (
    <Layout>
      <div className="about_wrap">
        <div className="about_title">
          <h1>Giới Thiệu</h1>
          <p></p>
        </div>
        <div className="about_logo">
          <img src={image} alt="about-logo" />
        </div>
      </div>
    </Layout>
  );
};

export default AboutUsPage;
