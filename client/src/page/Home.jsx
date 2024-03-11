import React, { useEffect, useState } from "react";
import slide from "../assets/image";
import TypeBook from "../custom/homecpn/TypeBook";
import Layout from "../layout/Layout";
import "./page.css";
import SliderImage from "../Slider/SliderImage";


function Home() {
  return (
    <Layout>
      <SliderImage>
        {slide.map((item, index) => {
          return <img key={index} src={item.image} alt={item.alt} />;
        })}
      </SliderImage>
      <div className="advertisement">
        <div className="booktype">
          <TypeBook
            href="/product/#literature"
            image="https://cdn0.fahasa.com/media/flashmagazine/images/page_images/the_literature_book/2022_11_01_17_00_05_4-390x510.jpg"
            alt="literatue"
            title='Literratue'
          />
        </div>
        <div className="booktype">
          <TypeBook
            href="#children"
            image="https://w7.pngwing.com/pngs/411/787/png-transparent-child-reading-illustration-sit-in-a-book-read-a-book-photography-comic-book-booking.png"
            alt="children"
            title='Children'
          />
        </div>
        <div className="booktype">
          <TypeBook
            href="#Psychology and Skills"
            image="https://www.hachette.co.uk/wp-content/uploads/2023/04/hbg-title-9781510472686-10.jpg?w=450"
            alt="PaS"
            title='Psychology And Skills'
          />
        </div>
        <div className="booktype">
          <TypeBook
            href="#Economics"
            image="https://ieltsbook.edu.vn/wp-content/uploads/2021/08/1.-The-Economics-Book-Big-Ideas-Simply-Explained-by-DK-Niall-Kishtainy-George-Abbot-John-Farndon-Frank-Kennedy-James-Meadway-Christopher-Wallace-Marcus-Weeks-z-lib.org_.jpg"
            alt="economic"
            title='Economics Book'
          />
        </div>
        <div className="booktype">
          <TypeBook
            href="#Foreign languages book"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfG9_23cPkMbPT97uQ1g8EQ6LpkqosckOPaQ&usqp=CAU"
            alt="FLB"
            title='Foreign Languages Book'
          />
        </div>
      </div>
    </Layout>
  );
}

export default Home;
