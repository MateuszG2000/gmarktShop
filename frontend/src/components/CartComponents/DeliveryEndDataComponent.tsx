import React from "react";
import css from "./DeliveryEndDataComponent.module.scss";
import { useSelector } from "react-redux";
function DeliveryEndDataComponent() {
  const address = useSelector((state: RootState) => state.cart.address);
  return (
    <div className={css.deliveryData}>
      <p className={css.title}>Adres dostawy:</p>
      {address?.city}
    </div>
  );
}

export default DeliveryEndDataComponent;
