import React, { useEffect, useState } from "react";
import ProductComponent from "../components/HomeComponents/ProductComponent";
import css from "./HomeSection.module.scss";
import SliderComponent from "../components/HomeComponents/SliderComponent";
import { useAppDispatch } from "../store/appHooks";
import { UIActions } from "../store/UI";
function HomeSection() {
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "http://192.168.0.106:9000/api/product/?fields=name,price,_id,image&limit=11"
        );
        const resData = await response.json();
        setProducts(resData.data);
      } catch (err) {
        dispatch(
          UIActions.showWarning({
            flag: "red",
            text: "Brak połączenia z serwerem",
          })
        );
      }
    })();
  }, [dispatch]);
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
