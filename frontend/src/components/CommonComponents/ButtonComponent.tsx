import React, { ReactNode } from "react";
import css from "./ButtonComponent.module.scss";
const ButtonComponent: React.FC<{
  disabled: boolean;
  spinner?: boolean;
  children: string | ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ children, disabled, onClick, spinner }) => {
  return (
    <>
      <button
        disabled={disabled}
        className={css.btn}
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
