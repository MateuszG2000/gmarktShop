import React from "react";
import css from "./SummaryComponent.module.scss";
import ButtonComponent from "../CommonComponents/ButtonComponent";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function SummaryComponent({
  buttonPath,
  disable,
  buttonText,
  buttonFunction,
}: {
  buttonPath: string;
  disable?: boolean;
  buttonText: React.ReactNode;
  buttonFunction?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const cartData = useSelector((state: RootState) => state.cart);
  return (
    <div className={css.summary}>
      <span className={`${css.title} ${css.col_1}`}>
        Podsumowanie zamówienia
      </span>

      <span className={css.col_1}>Suma zamówienia brutto</span>
      <span className={css.col_2}>{cartData.totalPrice.toFixed(2)} zl</span>

      <span className={css.col_1}>W tym VAT</span>
      <span className={css.col_2}>
        {Math.round((-cartData.totalPrice / 1.23 + cartData.totalPrice) * 100) /
          100}{" "}
        zl
      </span>

      <span className={css.col_1}>Koszt dostawy</span>
      <span className={css.col_2}>
        {typeof cartData.shipping.price === "string"
          ? cartData.shipping.price
          : cartData.shipping.price.toFixed(2) + " zł"}{" "}
      </span>
      <span className={`${css.endPrice} ${css.col_1}`}>Do zapłaty</span>
      <span className={`${css.endPrice} ${css.col_2}`}>
        {typeof cartData.shipping.price === "string"
          ? cartData.totalPrice
          : cartData.shipping.price + cartData.totalPrice}{" "}
        zł
      </span>
      <div className={css.btn}>
        <Link to={buttonPath}>
          <ButtonComponent
            onClick={buttonFunction}
            disabled={disable ? true : false}
          >
            {buttonText}
          </ButtonComponent>
        </Link>
      </div>
    </div>
  );
}

export default SummaryComponent;
