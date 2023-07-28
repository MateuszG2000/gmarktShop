import React from "react";
import css from "./SummaryComponent.module.scss";
import Button from "../AuthComponents/Button";
import { MdArrowForwardIos } from "react-icons/md";

function SummaryComponent() {
  return (
    <div className={css.summary}>
      <span className={`${css.title} ${css.col_1}`}>
        Podsumowanie zamówienia
      </span>

      <span className={css.col_1}>Suma zamówienia</span>
      <span className={css.col_2}>200 zl</span>

      <span className={css.col_1}>W tym VAT</span>
      <span className={css.col_2}>40 zl</span>

      <span className={css.col_1}>Koszt dostawy</span>
      <span className={css.col_2}>20 zl</span>
      <span className={`${css.endPrice} ${css.col_1}`}>Do zapłaty</span>
      <span className={`${css.endPrice} ${css.col_2}`}>260 zł</span>
      <div className={css.btn}>
        <Button disabled={false}>
          Dalej <MdArrowForwardIos />{" "}
        </Button>
      </div>
    </div>
  );
}

export default SummaryComponent;
