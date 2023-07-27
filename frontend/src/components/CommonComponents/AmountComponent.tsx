import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import css from "./AmountComponent.module.scss";
function AmountComponent() {
  const [amount, setAmount] = useState(1);
  function decrementHandler() {
    if (amount === 1) return;
    setAmount(amount - 1);
  }
  return (
    // <div className={css.amountComponent}>
    //   <span className={css.amountInfo}>Liczba sztuk:</span>
    <div className={css.amount}>
      <button className={css.btn} onClick={decrementHandler}>
        <AiOutlineMinus />
      </button>
      <span className={css.counter}>{amount}</span>
      <button
        className={css.btn}
        onClick={() => {
          setAmount(amount + 1);
        }}
      >
        <AiOutlinePlus />
      </button>
    </div>
  );
}
{
  /* <div className={css.amountLeft}>Z 10 sztuk</div>
</div> */
}

export default AmountComponent;
