import React from "react";
import css from "./SummaryComponent.module.scss";
import ButtonComponent from "../CommonComponents/ButtonComponent";
import { Link } from "react-router-dom";

function SummaryComponent({
  buttonPath,
  buttonText,
}: {
  buttonPath: string;
  buttonText: React.ReactNode;
}) {
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
        <Link to={buttonPath}>
          <ButtonComponent disabled={false}>{buttonText}</ButtonComponent>
        </Link>
      </div>
    </div>
  );
}

export default SummaryComponent;
