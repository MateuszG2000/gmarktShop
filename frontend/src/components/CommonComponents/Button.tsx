import React, { ReactNode } from "react";
import css from "./Button.module.scss";
const ButtonElement: React.FC<{
  disabled: boolean;
  children: string | ReactNode;
}> = ({ children, disabled }) => {
  return (
    <button disabled={disabled} className={css.btn} type="submit">
      {children}
    </button>
  );
};

export default ButtonElement;
