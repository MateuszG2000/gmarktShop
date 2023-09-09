import React, { ReactNode } from "react";
import css from "./ButtonComponent.module.scss";
const ButtonComponent: React.FC<{
  disabled?: boolean;
  spinner?: boolean;
  children: string | ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color?: number;
}> = ({ children, disabled, onClick, spinner, color }) => {
  let colorClass = "";
  if (color) {
    const colors: { [key: string]: string } = {
      1: "color-1",
      2: "color-2",
      3: "color-3",
    };
    colorClass = colors[color];
  }

  return (
    <>
      <button
        disabled={disabled}
        className={`${css.btn} ${css[colorClass]}`}
        type="submit"
        onClick={onClick}
      >
        {!spinner && children}
        {spinner && <span className={css.loader}></span>}
      </button>
    </>
  );
};

export default ButtonComponent;
