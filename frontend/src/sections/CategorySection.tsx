import React from "react";
import ProductComponent from "../components/HomeComponents/ProductComponent";
import css from "./CategorySection.module.scss";
import { useParams } from "react-router-dom";
import { useFetch } from "../utils/useFetch";
import ErrorComponent from "../components/AuthComponents/ErrorComponent";
import SpinnerComponent from "../components/CommonComponents/SpinnerComponent";
function CategorySection() {
  const { category } = useParams();
  const { responseData, error } = useFetch<Response>(
    `http://localhost:9000/api/product/?category=${category}`
  );
  const data: Product[] = responseData?.data;
  if (error)
    return <>{error && <ErrorComponent>Błąd serwera</ErrorComponent>}</>;
  if (!data) return <SpinnerComponent size={48} loading={true} />;
  return (
    <div className={css.list}>
      {data.map((prod) => (
        <ProductComponent key={prod._id} product={prod} />
      ))}
    </div>
  );
}

export default CategorySection;
