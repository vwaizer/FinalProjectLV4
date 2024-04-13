import React, { useEffect, useState } from "react";
import SliderImage from "../Slider/SliderImage";
import slide from "../assets/image";
import {
  photo2,
  photo3,
  photo4,
  photo6,
  photo8,
  photo9,
} from "../assets/imageHome.js";
import TypeBook from "../custom/homecpn/TypeBook";
import Layout from "../layout/Layout";
import SyncLoader from "react-spinners/SyncLoader";
import "./page.css";

const homeLoading = {
  display: "flex",
  justifyContent: "center",
  alignProperty: "center",
  margin: "20px auto",
};

function Home() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return (
    <Layout>
      {loading ? (
        <SyncLoader
          cssOverride={homeLoading }
          color="#ec5959"
          loading={loading}
          size={10}
        />
      ) : (
        <>
          <SliderImage>
            {slide.map((item, index) => {
              return <img key={index} src={item.image} alt={item.alt} />;
            })}
          </SliderImage>
          <div className="advertisement">
            <TypeBook
              href="/nha-sach"
              image={photo2}
              alt="book"
              title="Văn học"
            />
            <TypeBook
              href="/nha-sach"
              image={photo8}
              alt="book"
              title="Kinh Tế"
            />
            <TypeBook
              href="/nha-sach"
              image={photo9}
              alt="book"
              title="Tâm lý - Kỹ năng sống"
            />
            <TypeBook
              href="/nha-sach"
              image={photo6}
              alt="book"
              title="Nuôi dạy con"
            />
            <TypeBook
              href="/nha-sach"
              image={photo4}
              alt="book"
              title="Tiểu sử - Hồi ký"
            />
            <TypeBook
              href="/nha-sach"
              image={photo3}
              alt="book"
              title="Sách học Ngoại ngữ"
            />
          </div>
        </>
      )}
    </Layout>
  );
}

export default Home;
