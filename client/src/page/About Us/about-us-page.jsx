import React from "react";
import ImageSlider from "../../about-us/image-slider/image-slider";
import "./about-us-page.css";
import {
  AudioBookImage,
  BookImage,
  UsImage,
  Value1,
  Value2,
  Value3,
  Value4,
  Value5,
  Value6,
} from "./imports";
import Content from "./Content";
import AboutStory from "./AboutStory";
const sliderImages = [UsImage, BookImage, AudioBookImage];

const valueImages = [Value1, Value2, Value3, Value4, Value5, Value6];

const AboutUsPage = () => {
  const imageWidth = `calc(100% / ${valueImages.length} - 32px)`;

  return (
    <div className="AboutUsPage-shine about-us-page">
      <div className="flex-col content-container">
        <div className="hero-image">
          <img src={UsImage} alt="us" />
        </div>
        <div className="sectionContainer flex-col">
          <div className="section gap-md flex-col">
            <Content
              content="What we do"
              title=" At ShineAura, we are committed to delivering a comprehensive
                  beauty experience through two primary areas: Skincare and Makeup."
            />
            <div className="flex-row">
              <div className="flex-col">
                <img className="img-size" src={BookImage} alt="" />
                <div>
                  <Content
                    content="Skincare"
                    title=" Revitalize and nurture your skin with our premium skincare
                  products. From gentle cleansers to moisturizing creams, our
                  offerings cater to all skin types."
                  />
                </div>
              </div>
              <div className="flex-col">
                <img className="img-size" src={AudioBookImage} alt="" />
                <div>
                  <Content
                    content="Makeup"
                    title=" Unleash your creativity with our diverse makeup collection.
                  From lipsticks to eyeshadows, our products are designed to
                  enhance your features and let your unique beauty shine."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sectionContainer flex-col ourStoryContainer">
          <div className="right-container flex-col">
            <ImageSlider images={sliderImages} />
          </div>
          <div>
            <div>
              <AboutStory
                preTitle="About us"
                content="Our Story"
                title="A PASSIONATE BEGINNING:"
                text="ShineAura was born from the passion and belief that beauty is a
                way to celebrate the natural beauty of every woman. We embarked
                on this journey with the desire to bring confidence and natural
                beauty to women through high-quality and unique products."
              />
            </div>
          </div>
        </div>
        <div className="sectionContainer flex-col">
          <div className="section flex-col our-value gap-lg">
            <h2 className="h2">OUR VALUE</h2>
            <div className="flex-row flex-l gap-md value-images">
              {valueImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${index + 1}`}
                  style={{ width: imageWidth }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
