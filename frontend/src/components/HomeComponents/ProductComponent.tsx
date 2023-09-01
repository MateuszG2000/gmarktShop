import React, { useState } from "react";
import css from "./ProductComponent.module.scss";
import { BsCartPlusFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";
import { Link } from "react-router-dom";
function ProductComponent({ product }: { product: Product }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const dispatch = useDispatch();
  const addToCartHandler = (product: Product) => {
    dispatch(cartActions.addItem(product));
  };

  const img = `http://localhost:9000/api/images/${product.image}`;
  return (
    <Link to={`product/${product._id}`}>
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
            className={`${css.loader} ${
              imageLoaded ? css.loaded : css.loading
            }`}
          ></span>
        </div>
        <p className={css.title}>{product.name}</p>
        <div className={css.cartPrice}>
          <span className={css.price}>{product.price?.toFixed(2)} zł</span>
          <button
            className={css.addToCart}
            onClick={() => {
              addToCartHandler(product);
            }}
          >
            <BsCartPlusFill />
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductComponent;
