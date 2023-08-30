import React from "react";
import { useAppSelector } from "../../store/appHooks";
import { RootState } from "../../store";
import css from "./CartEmptyInfoComponent.module.scss";
import { Link } from "react-router-dom";
import { BsCartX } from "react-icons/bs";
import ButtonComponent from "../CommonComponents/ButtonComponent";
function CartEmptyInfoComponent() {
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  return (
    <>
      {cartItems.length === 0 && (
        <div className={css.empty}>
          <span className={css.emptyCartText}>
            Twój koszyk jest pusty
            <span className={css.icon}>
              <BsCartX />
            </span>
          </span>
          <div>
            <Link to="/">
              <ButtonComponent disabled={false}>
                Wróć na strone główną
              </ButtonComponent>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default CartEmptyInfoComponent;
