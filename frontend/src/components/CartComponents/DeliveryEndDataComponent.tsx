import React from "react";
import css from "./DeliveryEndDataComponent.module.scss";
import { useSelector } from "react-redux";
function DeliveryEndDataComponent() {
  const address = useSelector((state: RootState) => state.cart.address);
  return (
    <div className={css.deliveryData}>
      <p className={css.title}>Adres dostawy:</p>
      <div className={css.address}>
        {" "}
        <p>
          {address.name} {address.lastName}
        </p>
        <p>ul. {address.street}</p>
        <p>
          {address.code} {address.city}
        </p>
      </div>
      <br></br>
      <div className={css.contact}>
        {" "}
        <p>tel. {address.tel}</p>
        <p>e-mail: {address.mail}</p>
      </div>
    </div>
  );
}

export default DeliveryEndDataComponent;
