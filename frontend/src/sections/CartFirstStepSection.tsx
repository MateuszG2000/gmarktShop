import React from "react";
import DeliveryMethodComponent from "../components/CartComponents/DeliveryMethodComponent";
import ProductListComponent from "../components/CartComponents/ProductListComponent";
import StatusComponent from "../components/CartComponents/StatusComponent";
import SummaryComponent from "../components/CartComponents/SummaryComponent";
import css from "./CartFirstStepSection.module.scss";
import { MdArrowForwardIos } from "react-icons/md";

function CartFirstStepSection() {
  return (
    <div className={css.cart}>
      <StatusComponent step={1} />
      <ProductListComponent />
      <ProductListComponent />
      <div className={css.summaryDeliveryContainer}>
        <DeliveryMethodComponent />
        <SummaryComponent
          buttonText={
            <>
              Dalej <MdArrowForwardIos />
            </>
          }
          buttonPath="/cart/data"
        />
      </div>
    </div>
  );
}

export default CartFirstStepSection;
