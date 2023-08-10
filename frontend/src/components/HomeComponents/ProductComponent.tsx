import React, { useState } from "react";
import css from "./ProductComponent.module.scss";
import { BsCartPlusFill } from "react-icons/bs";

function ProductComponent({ product }: { product: Product }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const img = `http://localhost:9000/api/images/${product.image}`;

  return (
    <div className={css.product}>
      <div className={`${css.imgBox}`}>
        <img
          loading="lazy"
          className={`${css.image} ${imageLoaded ? css.imgLoaded : ""}`}
          src={img}
          alt="produkt"
          onLoad={() => setImageLoaded(true)}
        />
        <span
          className={`${css.loader} ${imageLoaded ? css.loaded : css.loading}`}
        ></span>
      </div>
      <p className={css.title}>{product.name}</p>
      <div className={css.cartPrice}>
        <span className={css.price}>{product.price?.toFixed(2)} zł</span>
        <span className={css.addToCart}>
          <BsCartPlusFill />
        </span>
      </div>
    </div>
  );
}

export default ProductComponent;
