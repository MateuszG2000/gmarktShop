import React from "react";
import css from "./DeliveryMethodComponent.module.scss";
function DeliveryMethodComponent() {
  return (
    <form className={css.deliveryMethodContainer}>
      <p className={css.title}>Płatność z góry</p>
      <p>
        <input
          type="radio"
          name="deliveryMethod"
          value="dpdG"
          id="dpdG"
        ></input>
        <label htmlFor="dpdG">Kurier DPD</label>
      </p>
      <p className={css.col_2}>15,99 zł</p>
      <p>
        <input
          type="radio"
          name="deliveryMethod"
          value="inpostG"
          id="inpostG"
        ></input>
        <label htmlFor="inpostG">Kurier Inpost</label>
      </p>
      <p className={css.col_2}>14,99 zł</p>

      <p className={css.parent}>
        <input
          type="radio"
          name="deliveryMethod"
          value="dhlG"
          id="dhlG"
        ></input>
        <label className={css.label} htmlFor="dhlG">
          Kurier DHL
        </label>
      </p>
      <p className={css.col_2}>16,50 zł</p>

      <p className={css.title}>Płatność za pobraniem</p>
      <p>
        <input
          type="radio"
          name="deliveryMethod"
          value="dpdP"
          id="dpdP"
        ></input>
        <label htmlFor="dpdP">Kurier DPD</label>
      </p>
      <p className={css.col_2}>20,99 zł</p>

      <p>
        <input
          type="radio"
          name="deliveryMethod"
          value="inpostP"
          id="inpostP"
        ></input>
        <label htmlFor="inpostP">Kurier Inpost</label>
      </p>
      <p className={css.col_2}>19,99 zł</p>

      <p>
        <input
          type="radio"
          name="deliveryMethod"
          value="dhlP"
          id="dhlP"
        ></input>
        <label htmlFor="dhlP">Kurier DHL</label>
      </p>
      <p className={css.col_2}>21,50 zł</p>
    </form>
  );
}

export default DeliveryMethodComponent;
