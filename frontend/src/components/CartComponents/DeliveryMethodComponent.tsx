import React, { ChangeEvent } from "react";
import css from "./DeliveryMethodComponent.module.scss";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";
const shippingMethods: IShipping[] = [
  { id: "dpdG", name: "Kuier DPD", price: 16.99, cashOnDelivery: false },
  { id: "dhdG", name: "Kuier DHL", price: 17.99, cashOnDelivery: false },
  { id: "inpostG", name: "Kuier Inpost", price: 15.99, cashOnDelivery: false },
  { id: "dpdP", name: "Kuier DPD", price: 21.99, cashOnDelivery: true },
  { id: "dhlP", name: "Kurier DHL", price: 22.99, cashOnDelivery: true },
  { id: "inpostP", name: "Kurier Inpost", price: 20.5, cashOnDelivery: true },
];
function DeliveryMethodComponent() {
  const dispatch = useDispatch();
  const shippingHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const shipping: IShipping = {
      id: event.target.id,
      name: String(event.target.dataset.name),
      price: Number(event.target.dataset.price),
      cashOnDelivery: event.target.dataset.cash === "false" ? false : true,
    };
    dispatch(cartActions.setShipping(shipping));
  };
  return (
    <form className={css.deliveryMethodContainer}>
      <p className={css.title}>Płatność z góry</p>
      {shippingMethods.map((item) =>
        !item.cashOnDelivery ? (
          <React.Fragment key={item.id}>
            <p>
              <input
                type="radio"
                name="deliveryMethod"
                id={item.id}
                data-price={item.price}
                data-name={item.name}
                data-cash={item.cashOnDelivery}
                onChange={shippingHandler}
              ></input>
              <label htmlFor={item.id}>{item.name}</label>
            </p>
            <p className={css.col_2}>{item.price.toFixed(2)} zł</p>
          </React.Fragment>
        ) : (
          ""
        )
      )}

      <p className={css.title}>Płatność za pobraniem</p>
      {shippingMethods.map((item) =>
        item.cashOnDelivery ? (
          <React.Fragment key={item.id}>
            <p>
              <input
                type="radio"
                name="deliveryMethod"
                id={item.id}
                onChange={shippingHandler}
                data-price={item.price}
                data-name={item.name}
                data-cash={item.cashOnDelivery}
              ></input>
              <label htmlFor={item.id}>{item.name}</label>
            </p>
            <p className={css.col_2}>{item.price.toFixed(2)} zł</p>
          </React.Fragment>
        ) : (
          ""
        )
      )}
    </form>
  );
}

export default DeliveryMethodComponent;
