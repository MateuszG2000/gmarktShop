import React, { ChangeEvent, ReactNode, useEffect } from "react";
import css from "./DeliveryMethodComponent.module.scss";
import { useSelector } from "react-redux";
import { cartActions } from "../../store/cart";
import { useAppDispatch } from "../../store/appHooks";
const shippingMethods: IShipping[] = [
  { id: "dpdG", name: "Kuier DPD", price: 16.99, cashOnDelivery: false },
  { id: "dhdG", name: "Kuier DHL", price: 17.99, cashOnDelivery: false },
  { id: "inpostG", name: "Kuier Inpost", price: 15.99, cashOnDelivery: false },
  { id: "dpdP", name: "Kuier DPD", price: 21.99, cashOnDelivery: true },
  { id: "dhlP", name: "Kurier DHL", price: 22.99, cashOnDelivery: true },
  { id: "inpostP", name: "Kurier Inpost", price: 20.5, cashOnDelivery: true },
];
function DeliveryMethodComponent() {
  const shipping = useSelector((state: RootState) => state.cart.shipping);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cartActions.setShipping(shippingMethods[0]));
  }, [dispatch]);
  const shippingHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const shipping: IShipping = {
      id: event.target.id,
      name: String(event.target.dataset.name),
      price: Number(event.target.dataset.price),
      cashOnDelivery: event.target.dataset.cash === "false" ? false : true,
    };
    dispatch(cartActions.setShipping(shipping));
  };
  const markup = (bool: boolean): ReactNode => {
    return shippingMethods.map((item, index) => {
      let check = false;
      if (item.id === shipping.id) check = true;
      else check = false;
      const isDisplay =
        bool === true ? item.cashOnDelivery : !item.cashOnDelivery;
      return isDisplay ? (
        <React.Fragment key={item.id}>
          <p>
            <input
              checked={check}
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
      );
    });
  };

  return (
    <form className={css.deliveryMethodContainer}>
      <p className={css.title}>Płatność z góry</p>
      {markup(false)}
      <p className={css.title}>Płatność za pobraniem</p>
      {markup(true)}
    </form>
  );
}

export default DeliveryMethodComponent;
