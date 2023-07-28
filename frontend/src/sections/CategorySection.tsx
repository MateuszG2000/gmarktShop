import React from "react";
import ProductComponent from "../components/HomeComponents/ProductComponent";
import css from "./CategorySection.module.scss";
function CategorySection() {
  return (
    <div className={css.list}>
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

export default CategorySection;
