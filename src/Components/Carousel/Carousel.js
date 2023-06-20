import React, { useState } from "react";
import "./Carousel.css";

function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };
  return (
    <div className="carousel">
      <div className="carousel-images">
        {images.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Carousel Image ${index}`}
            style={{
              width: 1500,
              height: 400,
              borderRadius: "20px",
              marginBottom: "10px",
            }}
            className={index === currentIndex ? "active" : ""}
          />
        ))}
      </div>
      <div className="carousel-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={index === currentIndex ? "active" : ""}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
