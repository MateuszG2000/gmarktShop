import React from "react";
import css from "./StatusComponent.module.scss";
import { ImCheckmark } from "react-icons/im";
import { Link } from "react-router-dom";
function StatusComponent({ step }: { step: number }) {
  return (
    <div className={css.summary}>
      <div className={css.step}>
        <Link to="/cart">
          <div
            className={`${css["circle"]} ${step === 1 ? css["active"] : ""}`}
          >
            {step > 1 ? (
              <span>
                <ImCheckmark />
              </span>
            ) : (
              ""
            )}
          </div>
          <p>Koszyk</p>
        </Link>
      </div>
      <div className={`${css["line"]} ${step > 1 ? css["active"] : ""}`}></div>
      {step > 1 && (
        <Link to="/cart/data">
          <div className={css.step}>
            <div
              className={`${css["circle"]} ${step === 2 ? css["active"] : ""}`}
            >
              {step > 2 ? (
                <span>
                  <ImCheckmark />
                </span>
              ) : (
                ""
              )}
            </div>

            <p>Twoje dane</p>
          </div>
        </Link>
      )}
      {step == 1 && (
        <div className={css.step}>
          <div className={`${css["circle"]}`}>
            {step > 2 ? (
              <span>
                <ImCheckmark />
              </span>
            ) : (
              ""
            )}
          </div>

          <p>Twoje dane</p>
        </div>
      )}
      <div className={`${css["line"]} ${step > 2 ? css["active"] : ""}`}></div>
      <div className={css.step}>
        <div
          className={`${css["circle"]} ${step === 3 ? css["active"] : ""}`}
        ></div>
        <p>Podsumowanie</p>
      </div>
    </div>
  );
}

export default StatusComponent;
