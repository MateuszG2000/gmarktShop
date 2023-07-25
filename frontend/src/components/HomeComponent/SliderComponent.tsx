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
        {}
        <img
          className={`${
            actualSlide === 0 ? css["visible"] : css["corouselItem"]
          }`}
          alt="monitor"
          src={sliderData[0]}
        />
        <img
          className={`${
            actualSlide === 1 ? css["visible"] : css["corouselItem"]
          }`}
          alt="monitor"
          src={sliderData[1]}
        />
        <img
          className={`${
            actualSlide === 2 ? css["visible"] : css["corouselItem"]
          }`}
          alt="monitor"
          src={sliderData[2]}
        />
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
        <button
          className={`${css["circle"]} ${actualSlide === 0 ? css["fill"] : ""}`}
          onClick={() => {
            setActualSlide(0);
          }}
        ></button>
        <button
          className={`${css["circle"]} ${actualSlide === 1 ? css["fill"] : ""}`}
          onClick={() => {
            setActualSlide(1);
          }}
        ></button>
        <button
          className={`${css["circle"]} ${actualSlide === 2 ? css["fill"] : ""}`}
          onClick={() => {
            setActualSlide(2);
          }}
        ></button>
      </div>
    </div>
  );
}

export default SliderComponent;
