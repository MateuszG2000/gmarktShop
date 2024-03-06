import React, { ReactNode } from "react";
import css from "./ButtonComponent.module.scss";
const ButtonComponent = ({
  disabled,
  spinner,
  children,
  onClick,
  color,
  style,
}: {
  disabled?: boolean;
  spinner?: boolean;
  children: string | ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color?: number;
  style?: React.CSSProperties;
}) => {
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
        aria-label="Przycisk"
        disabled={disabled}
        className={`${css.btn} ${css[colorClass]}`}
        type="submit"
        onClick={onClick}
        style={style}
      >
        {!spinner && children}
        {spinner && <span className={css.loader}></span>}
      </button>
    </>
  );
};

export default ButtonComponent;
