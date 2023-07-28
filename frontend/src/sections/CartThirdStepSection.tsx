import React from "react";
import css from "./CartThirdStepSection.module.scss";
import StatusComponent from "../components/CartComponents/StatusComponent";
import DeliveryDataComponent from "../components/CartComponents/DeliveryDataComponent";
import SummaryComponent from "../components/CartComponents/SummaryComponent";
import ProductListComponent from "../components/CartComponents/ProductListComponent";
function CartThirdStepSection() {
  return (
    <div className={css.cart}>
      <StatusComponent step={3} />
      <ProductListComponent moreData={false} />
      <div className={css.deliverySummary}>
        <DeliveryDataComponent />
        <SummaryComponent buttonText={<>Zapłać</>} buttonPath="/cart/summary" />
      </div>
    </div>
  );
}

export default CartThirdStepSection;
