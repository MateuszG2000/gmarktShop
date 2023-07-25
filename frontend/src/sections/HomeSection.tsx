import React from "react";
import ProductComponent from "../components/HomeComponents/ProductComponent";
import css from "./HomeSection.module.scss";
import SliderComponent from "../components/HomeComponents/SliderComponent";
function HomeSection() {
  return (
    <div className={css.homeSection}>
      <SliderComponent />
      <ProductComponent />
      <ProductComponent />
      <ProductComponent />
      <ProductComponent />
      <ProductComponent />
      <ProductComponent />
    </div>
  );
}

export default HomeSection;
