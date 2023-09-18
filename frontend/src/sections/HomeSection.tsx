import React from "react";
import ProductComponent from "../components/HomeComponents/ProductComponent";
import css from "./HomeSection.module.scss";
import SliderComponent from "../components/HomeComponents/SliderComponent";
import { useFetch } from "../utils/useFetch";
import ErrorComponent from "../components/AuthComponents/ErrorComponent";
import SpinnerComponent from "../components/CommonComponents/SpinnerComponent";
function HomeSection() {
  const { responseData, error } = useFetch<Response>(
    "http://localhost:9000/api/product/?fields=name,price,_id,image&limit=11"
  );
  const data: Product[] = responseData?.data;
  if (error)
    return <>{error && <ErrorComponent>Błąd serwera</ErrorComponent>}</>;
  if (!data) return <SpinnerComponent size={48} loading={true} />;
  return (
    <div className={css.homeSection}>
      <SliderComponent></SliderComponent>
      {data?.map((prod) => (
        <ProductComponent key={prod._id} product={prod} />
      ))}
    </div>
  );
}
export default HomeSection;
