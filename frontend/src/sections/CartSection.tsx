import React from "react";
import DeliveryMethodComponent from "../components/CartComponents/DeliveryMethodComponent";
import ProductListComponent from "../components/CartComponents/ProductListComponent";
import StatusComponent from "../components/CartComponents/StatusComponent";
import SummaryComponent from "../components/CartComponents/SummaryComponent";

function CartSection() {
  return (
    <>
      <StatusComponent />
      <ProductListComponent />
      <ProductListComponent />
      <DeliveryMethodComponent />
      <SummaryComponent />
    </>
  );
}

export default CartSection;
