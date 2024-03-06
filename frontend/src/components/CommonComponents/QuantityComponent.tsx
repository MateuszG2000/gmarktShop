import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import css from "./QuantityComponent.module.scss";

function QuantityComponent({
  quantityProp,
  onChange,
  onRemove,
  maxQuantity,
}: {
  quantityProp: number;
  onChange: Function;
  onRemove: Function;
  maxQuantity: number;
}) {
  const [quantity, setQuantity] = useState(quantityProp);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    onChange(newQuantity);
  };

  const decrementHandler = () => {
    if (quantity === 1) {
      onRemove();
    } else {
      handleQuantityChange(quantity - 1);
    }
  };

  const incrementHandler = () => {
    if (quantity < maxQuantity) {
      handleQuantityChange(quantity + 1);
    }
  };

  return (
    <div className={css.quantity}>
      <button aria-label="Zwiększ" className={css.btn} onClick={decrementHandler}>
        <AiOutlineMinus />
      </button>
      <span className={css.counter}>{quantity}</span>
      <button aria-label="Zmniejsz" className={css.btn} onClick={incrementHandler}>
        <AiOutlinePlus />
      </button>
    </div>
  );
}

export default QuantityComponent;
