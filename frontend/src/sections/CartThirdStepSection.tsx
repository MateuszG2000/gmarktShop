import React from "react";
import css from "./CartThirdStepSection.module.scss";
import StatusComponent from "../components/CartComponents/StatusComponent";
import DeliveryDataComponent from "../components/CartComponents/DeliveryDataComponent";
import SummaryComponent from "../components/CartComponents/SummaryComponent";
import ProductListComponent from "../components/CartComponents/ProductListComponent";
import { useSelector } from "react-redux";
function CartThirdStepSection() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  return (
    <div className={css.cart}>
      <StatusComponent step={3} />
      {cartItems.map((item) => (
        <ProductListComponent key={item._id} product={item} moreData={false} />
      ))}
      <div className={css.deliverySummary}>
        <DeliveryDataComponent />
        <SummaryComponent buttonText={<>Zapłać</>} buttonPath="/cart/summary" />
      </div>
    </div>
  );
}

export default CartThirdStepSection;
