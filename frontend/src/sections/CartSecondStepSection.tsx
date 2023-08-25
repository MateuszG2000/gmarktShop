import React, { useState } from "react";
import css from "./CartSecondStepSection.module.scss";
import SummaryComponent from "../components/CartComponents/SummaryComponent";
import StatusComponent from "../components/CartComponents/StatusComponent";
import DeliveryDataComponent from "../components/CartComponents/DeliveryDataComponent";
import { MdArrowForwardIos } from "react-icons/md";
import ProductListComponent from "../components/CartComponents/ProductListComponent";
import { useSelector } from "react-redux";
import { useAppSelector } from "../store/appHooks";
function CartSecondStepSection() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const userIsLogged = useAppSelector(
    (state: RootState) => state.user.loggedIn
  );
  return (
    <div className={css.cart}>
      <StatusComponent step={2} />
      {cartItems.map((item) => (
        <ProductListComponent key={item._id} product={item} moreData={false} />
      ))}
      <div className={css.deliverySummary}>
        <DeliveryDataComponent />
        <SummaryComponent
          disable={!userIsLogged}
          buttonText={
            <>
              Podusmowanie <MdArrowForwardIos />
            </>
          }
          buttonPath="/cart/summary"
        />
      </div>
    </div>
  );
}

export default CartSecondStepSection;
