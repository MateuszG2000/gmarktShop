import React from "react";
import DeliveryMethodComponent from "../components/CartComponents/DeliveryMethodComponent";
import ProductListComponent from "../components/CartComponents/ProductListComponent";
import StatusComponent from "../components/CartComponents/StatusComponent";
import SummaryComponent from "../components/CartComponents/SummaryComponent";
import css from "./CartSection.module.scss";
function CartSection() {
  return (
    <div className={css.cart}>
      <StatusComponent />
      <ProductListComponent />
      <ProductListComponent />
      <div className={css.summaryDeliveryContainer}>
        <DeliveryMethodComponent />
        <SummaryComponent />
      </div>
    </div>
  );
}

export default CartSection;
