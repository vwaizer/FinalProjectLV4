import React, { useState, useEffect } from "react";

import "./slider-detail.css";
import { useNavigate } from "react-router-dom";

function SliderDetail({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDone, setSlideDone] = useState(true);
  const [timeID, setTimeID] = useState(null);
  const navigative = useNavigate();

  useEffect(() => {
    if (slideDone) {
      setSlideDone(false);
      setTimeID(
        setTimeout(() => {
          slideNext();
          setSlideDone(true);
        }, 1000)
      );
    }
  }, [slideDone]);

  const slideNext = () => {
    setActiveIndex((val) => {
      if (val >= children.length - 1) {
        return 0;
      } else {
        return val + 1;
      }
    });
  };

  const slidePrev = () => {
    setActiveIndex((val) => {
      if (val <= 0) {
        return children.length - 1;
      } else {
        return val - 1;
      }
    });
  };

  const AutoPlayStop = () => {
    if (timeID > 0) {
      clearTimeout(timeID);
      setSlideDone(false);
    }
  };

  const AutoPlayStart = () => {
    if (!slideDone) {
      setSlideDone(true);
    }
  };

  const backToProduct = () => {
    navigative("/product");
  };

  return (
    <>
      <h2 className="h2-detail">Basic Product</h2>
      <div
        className="container__slider-detail"
        onMouseEnter={AutoPlayStop}
        onMouseLeave={AutoPlayStart}
      >
        {children.map((item, index) => {
          return (
            <div
              className={
                "slider__item_detail slider__item_detail-active-" + (activeIndex + 1)
              }
              key={index}
              onClick={backToProduct}
            >
              {item}
            </div>
          );
        })}

        <button
          className="slider__btn-next"
          onClick={(e) => {
            e.preventDefault();
            slideNext();
          }}
        >
          {">"}
        </button>
        <button
          className="slider__btn-prev"
          onClick={(e) => {
            e.preventDefault();
            slidePrev();
          }}
        >
          {"<"}
        </button>
      </div>
    </>
  );
}

export default SliderDetail;
