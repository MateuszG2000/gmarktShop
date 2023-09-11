import React, { useState } from "react";
import css from "./ProductComponent.module.scss";
import { BsCartPlusFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";
import { useNavigate } from "react-router-dom";
function ProductComponent({ product }: { product: Product }) {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const dispatch = useDispatch();
  const addToCartHandler = (product: Product) => {
    dispatch(cartActions.addItem(product));
  };

  return (
    <div
      onClick={() => {
        navigate(`../product/${product._id}`);
      }}
      className={css.product}
    >
      <div className={`${css.imgBox}`}>
        <img
          loading="lazy"
          className={`${css.image} ${imageLoaded ? css.imgLoaded : ""}`}
          src={`http://localhost:9000/api/images/${product.image}`}
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
        <button
          className={css.addToCart}
          onClick={(e) => {
            e.stopPropagation();
            addToCartHandler(product);
          }}
        >
          <BsCartPlusFill />
        </button>
      </div>
    </div>
  );
}

export default ProductComponent;
