import React, { ReactNode, useEffect, useState } from "react";
import css from "./DeliveryMethodComponent.module.scss";
import { cartActions } from "../../store/cart";
import { useDispatch } from "react-redux";
function DeliveryMethodComponent() {
  const [data, setData] = useState<IShipping[]>();
  const [selected, setSelected] = useState("");
  const dispatch = useDispatch();
  let check = false;
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "http://localhost:9000/api/config?fields=shipping",
          {
            credentials: "include",
          }
        );
        const resData = await response.json();
        setData(resData.data.shipping);
        dispatch(cartActions.setShipping(resData.data.shipping[0]));
        setSelected(resData.data.shipping[0]._id);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [dispatch]);
  const shippingHandler = (id: string) => {
    setSelected(id);
    const shipping = data?.find((item) => item._id === id);
    dispatch(cartActions.setShipping(shipping));
  };
  if (!data) return <span></span>;
  const markup = (cashOnDelivery: boolean): ReactNode => {
    return data.map((data: any, index) => {
      if (data._id === selected) check = true;
      else check = false;
      if (data.cashOnDelivery !== cashOnDelivery)
        return <React.Fragment key={data._id}></React.Fragment>;
      return (
        <React.Fragment key={data._id}>
          <p>
            <input
              checked={check}
              type="radio"
              name="deliveryMethod"
              id={data._id}
              data-price={data.price}
              data-name={data.name}
              data-cash={data.cashOnDelivery}
              onChange={() => shippingHandler(data._id)}
            ></input>
            <label htmlFor={data._id}>
              {data.name} {data.company}
            </label>
          </p>
          <p className={css.col_2}>{data.price.toFixed(2)} zł</p>
        </React.Fragment>
      );
    });
  };

  return (
    <form className={css.deliveryMethodContainer}>
      {data && (
        <>
          <p className={css.title}>Płatność z góry</p>
          {markup(false)}
          <p className={css.title}>Płatność za pobraniem</p>
          {markup(true)}
        </>
      )}
    </form>
  );
}

export default DeliveryMethodComponent;
