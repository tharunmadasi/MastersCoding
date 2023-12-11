import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "../../Assets/CSS/slick.css";
import "../../Assets/CSS/slick-theme.css";
import "./Carousel.css";

function Carousel() {
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      sliderRef.current?.slickNext();
    }, 3000); 

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ marginLeft: '340px', marginTop: '60px'}}>
    <Slider
      ref={sliderRef}
      className="carousel-container"
      dots={true}
      autoplay={true}
      autoplaySpeed={3000}
      fade={true}
    >
      <div className="carousel-item justify-content-center">
        <img
          style={{ width: '900px', height: '450px' }}
          src="https://universityinnovation.org/images/f/f3/Campus1.png"
          alt="Slide 1"
        />
        <div className="carousel-caption"></div>
      </div>
      <div className="carousel-item justify-content-center">
        <img
          style={{ width: '900px', height: '450px' }}
          src="https://theacademicinsights.com/wp-content/uploads/2021/07/VNR-Vignana-Jyothi-Institute-of-Engineering-and-Technology.jpg"
          alt="Slide 2"
        />
        <div className="carousel-caption"></div>
      </div>
      <div className="carousel-item justify-content-center">
        <img
          style={{ width: '900px', height: '450px' }}
          src="https://media.getmyuni.com/reviews/45500__28671/1506083609images%20(12).jpg"
          alt="Slide 3"
        />
        <div className="carousel-caption"></div>
      </div>
      <div className="carousel-item justify-content-center">
        <img
          style={{ width: '900px', height: '450px' }}
          src="https://vnrvjiet.ac.in/assets/images/CSE_Department_Inner.png.png"
          alt="Slide 4"
        />
        <div className="carousel-caption"></div>
      </div>
    </Slider>
    </div>
  );
}

export default Carousel;
