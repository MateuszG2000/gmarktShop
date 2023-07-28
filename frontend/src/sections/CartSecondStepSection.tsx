import React from "react";
import css from "./CartSecondStepSection.module.scss";
import SummaryComponent from "../components/CartComponents/SummaryComponent";
import StatusComponent from "../components/CartComponents/StatusComponent";
import DeliveryDataComponent from "../components/CartComponents/DeliveryDataComponent";
import { MdArrowForwardIos } from "react-icons/md";
function CartSecondStepSection() {
  return (
    <div className={css.cart}>
      <StatusComponent step={2} />
      <div className={css.deliverySummary}>
        <DeliveryDataComponent />
        <SummaryComponent
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
