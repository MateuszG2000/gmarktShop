import React from "react";
import css from "./IconComponent.module.scss";
const IconComponent: React.FC<{
  children: React.ReactNode;
  text: string;
}> = ({ children, text }) => {
  return (
    <div className={css.icon}>
      {children}
      <br />
      <p>{text}</p>
    </div>
  );
};

export default IconComponent;
