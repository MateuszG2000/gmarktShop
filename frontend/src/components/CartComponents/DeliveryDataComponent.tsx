import React, { useState } from "react";
import css from "./DeliveryDataComponent.module.scss";
function DeliveryDataComponent() {
  return (
    <div className={css.deliveryData}>
      <p className={css.title}>Adres dostawy:</p>
      <p>Mateusz G</p>
      <p>ul. Akacjowa 18</p>
      <p>85-489 Łaziska</p>
      <br></br>
      <p>tel. 721123987</p>
      <p>e-mail: abc@wp.pl</p>
    </div>
  );
}

export default DeliveryDataComponent;
