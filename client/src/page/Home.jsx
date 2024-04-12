import React from "react";
import SliderImage from "../Slider/SliderImage";
import slide from "../assets/image";
import TypeBook from "../custom/homecpn/TypeBook";
import Layout from "../layout/Layout";
import Logo from "../custom/productcpn/Logo.jsx";
import {photo1, photo2, photo3, photo4, photo6, photo7, photo8, photo9} from '../assets/imageHome.js'

import {
  picture1,
  picture2,
  picture3,
  picture4,
  picture5,
  picture6,
} from "../assets/imageProduct.js";
import "./page.css";

function Home() {
  return (
    <Layout>
      <SliderImage>
        {slide.map((item, index) => {
          return <img key={index} src={item.image} alt={item.alt} />;
        })}
      </SliderImage>
      <div className="advertisement"> 
        <TypeBook href="/nha-sach" image={photo2} alt="book" title="Văn học" />
        <TypeBook href="/nha-sach" image={photo8} alt="book" title="Kinh Tế" />
        <TypeBook href="/nha-sach" image={photo9} alt="book" title="Tâm lý - Kỹ năng sống" />
        <TypeBook href="/nha-sach" image={photo6} alt="book" title="Nuôi dạy con" />
        <TypeBook href="/nha-sach" image={photo4} alt="book" title="Tiểu sử - Hồi ký" />
        <TypeBook href="/nha-sach" image={photo3} alt="book" title="Sách học Ngoại ngữ" />
      </div>
    </Layout>
  );
}

export default Home;
