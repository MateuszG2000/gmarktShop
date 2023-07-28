import React, { ReactNode } from "react";
import css from "./ButtonComponent.module.scss";
const ButtonComponent: React.FC<{
  disabled: boolean;
  children: string | ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ children, disabled, onClick }) => {
  return (
    <button
      disabled={disabled}
      className={css.btn}
      type="submit"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
