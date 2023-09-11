import React from "react";
import css from "./StatusComponent.module.scss";
import { ImCheckmark } from "react-icons/im";
import { Link } from "react-router-dom";

function StatusComponent({ step }: { step: number }) {
  const steps: { text: string; link: string }[] = [
    { text: "Koszyk", link: "/cart" },
    { text: "Twoje dane", link: "/cart/data" },
    { text: "Podsumowanie", link: "" },
  ];

  return (
    <div className={css.summary}>
      {steps.map((s, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <div
              className={`${css["line"]} ${step > index ? css["active"] : ""}`}
            ></div>
          )}
          {step >= index + 1 ? (
            <Link to={s.link}>
              <div
                className={`${css["circle"]} ${
                  step === index + 1 ? css["active"] : ""
                }`}
              >
                {step > index + 1 && (
                  <span>
                    <ImCheckmark />
                  </span>
                )}
              </div>
              <p>{s.text}</p>
            </Link>
          ) : (
            <div className={css.step}>
              <div className={`${css["circle"]}`}></div>
              {step > index + 1 && (
                <span>
                  <ImCheckmark />
                </span>
              )}
              <p>{s.text}</p>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default StatusComponent;
