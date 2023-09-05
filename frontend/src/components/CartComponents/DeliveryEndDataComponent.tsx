import React from "react";
import css from "./DeliveryEndDataComponent.module.scss";
function DeliveryEndDataComponent({ address }: { address: Address }) {
  return (
    <div className={css.deliveryData}>
      <p className={css.title}>Adres dostawy:</p>
      <div className={css.address}>
        {" "}
        <p>
          {address.name} {address.lastName}
        </p>
        <p>
          ul. {address.street} {address.houseNumber}
        </p>
        <p>
          {address.code} {address.city}
        </p>
      </div>
      <br></br>
      <div className={css.contact}>
        {" "}
        <p>tel. {address.tel}</p>
        <p>e-mail: {address.email}</p>
      </div>
    </div>
  );
}

export default DeliveryEndDataComponent;
