import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import css from "./QuantityComponent.module.scss";
function QuantityComponent({
  quantityProp,
  onChange,
  onRemove,
}: {
  quantityProp: number;
  onChange: Function;
  onRemove: Function;
}) {
  const [quantity, setQuantity] = useState(quantityProp);
  function decrementHandler() {
    if (quantity === 1) {
      onRemove();
      return;
    }
    setQuantity(quantity - 1);
    onChange(quantity - 1);
  }
  return (
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

export default QuantityComponent;
