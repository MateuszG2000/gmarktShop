import React from "react";
import ProductComponent from "../components/HomeComponent/ProductComponent";
import css from "./HomeSection.module.scss";
import SliderComponent from "../components/HomeComponent/SliderComponent";
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
      <ProductComponent />
      <ProductComponent />
      <ProductComponent />
      <ProductComponent />
    </div>
  );
}

export default HomeSection;
