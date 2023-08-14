import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import css from "./QuantityComponent.module.scss";
function QuantityComponent({
  quantityProp,
  onChange,
}: {
  quantityProp: number;
  onChange: Function;
}) {
  const [quantity, setQuantity] = useState(quantityProp);
  function decrementHandler() {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
    onChange(quantity - 1);
  }
  return (
    // <div className={css.QuantityComponent}>
    //   <span className={css.quantityInfo}>Liczba sztuk:</span>
    <div className={css.quantity}>
      <button className={css.btn} onClick={decrementHandler}>
        <AiOutlineMinus />
      </button>
      <span className={css.counter}>{quantity}</span>
      <button
        className={css.btn}
        onClick={() => {
          setQuantity(quantity + 1);
          onChange(quantity + 1);
        }}
      >
        <AiOutlinePlus />
      </button>
    </div>
  );
}
{
  /* <div className={css.quantityLeft}>Z 10 sztuk</div>
</div> */
}

export default QuantityComponent;
