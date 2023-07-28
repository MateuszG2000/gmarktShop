import React from "react";
import css from "./Button.module.scss";
const ButtonElement: React.FC<{
  disabled: boolean;
  children: string;
}> = ({ children, disabled }) => {
  return (
    <button disabled={disabled} className={css.btn} type="submit">
      {children}
    </button>
  );
};

export default ButtonElement;
