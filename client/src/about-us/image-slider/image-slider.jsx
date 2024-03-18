import React, { useState, useEffect } from 'react';
import './image-slider.css';

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, images]);

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return <div>No images to display.</div>;
  }

  const transformValue = -100 * currentIndex + '%';

  return (
    <div className="image-slider">
      <div className="image-container" style={{ transform: `translateX(${transformValue})` }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={index === currentIndex ? 'active' : ''}
          />
        ))}
      </div>
      <div className="indicators">
        {images.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;