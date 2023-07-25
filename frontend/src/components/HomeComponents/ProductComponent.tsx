import React from "react";
import css from "./ProductComponent.module.scss";
import { BsCartPlusFill } from "react-icons/bs";
import monitor from "../../Photos/i-xiaomi-mi-curved-gaming-34-bhr4269gl.jpg.webp";
function ProductComponent() {
  return (
    <div className={css.product}>
      <div className={css.imgBox}>
        <img className={css.image} src={monitor} alt="produkt" />
      </div>
      <p className={css.title}> Oto produkt numer 1 Oto produkt numer 1</p>
      <div className={css.cartPrice}>
        <span className={css.price}>200,00 zł</span>
        <span className={css.addToCart}>
          <BsCartPlusFill />
        </span>
      </div>
    </div>
  );
}

export default ProductComponent;
