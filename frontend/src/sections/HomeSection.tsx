import React, { useEffect, useState } from "react";
import ProductComponent from "../components/HomeComponents/ProductComponent";
import css from "./HomeSection.module.scss";
import SliderComponent from "../components/HomeComponents/SliderComponent";
import WarningComponent from "../components/CommonComponents/WarningComponent";
function HomeSection() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "http://localhost:9000/api/product/?fields=name,_id,image&limit=11"
        );
        const resData = await response.json();
        setProducts(resData.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <div className={css.homeSection}>
      <SliderComponent></SliderComponent>
      {products.map((prod) => (
        <ProductComponent key={prod._id} product={prod} />
      ))}
    </div>
  );
}
export default HomeSection;
