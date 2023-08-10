import React, { useEffect, useState } from "react";
import ProductComponent from "../components/HomeComponents/ProductComponent";
import css from "./CategorySection.module.scss";
import { useParams } from "react-router-dom";
function CategorySection() {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:9000/api/product/?category=${category}`
        );
        const resData = await response.json();
        setProducts(resData.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [category]);
  return (
    <div className={css.list}>
      {products.map((prod) => (
        <ProductComponent key={prod._id} product={prod} />
      ))}
    </div>
  );
}

export default CategorySection;
