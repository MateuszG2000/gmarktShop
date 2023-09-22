import React, { useEffect, useRef, useState } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import css from "./SliderComponent.module.scss";
import img1 from "../../Photos/monitor1.png";
import img2 from "../../Photos/mysz1.png";
import img3 from "../../Photos/sluchawki1.png";
function SliderComponent() {
  const sliderData = [img1, img2, img3];
  const [actualSlide, setActualSlide] = useState(0);
  const timeout: { current: any } = useRef(null);
  function goToSlide(slide: number): void {
    clearTimeout(timeout.current);
    const slidesAmount = sliderData.length;
    if (slide === slidesAmount) {
      setActualSlide(0);
    } else if (slide === -1) {
      setActualSlide(slidesAmount - 1);
    } else {
      setActualSlide(slide);
    }
  }
  useEffect(() => {
    timeout.current = setTimeout(() => {
      goToSlide(actualSlide + 1);
    }, 5000);
  });
  return (
    <div className={css.slider}>
      <div className={css.carousel}>
        {sliderData.map((image, index) => (
          <img
            key={index}
            className={`${
              actualSlide === index ? css["visible"] : css["corouselItem"]
            }`}
            alt="monitor"
            src={image}
            crossOrigin="anonymous"
          />
        ))}
      </div>
      <button
        className={css.sliderForwardButton}
        onClick={() => {
          goToSlide(actualSlide + 1);
        }}
      >
        <BsArrowRightCircle />
      </button>
      <button
        className={css.sliderBackButton}
        onClick={() => {
          goToSlide(actualSlide - 1);
        }}
      >
        <BsArrowLeftCircle />
      </button>
      <div className={css.circleBox}>
        {sliderData.map((_, index) => (
          <button
            key={index}
            className={`${css["circle"]} ${
              actualSlide === index ? css["fill"] : ""
            }`}
            onClick={() => {
              setActualSlide(index);
            }}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default SliderComponent;
