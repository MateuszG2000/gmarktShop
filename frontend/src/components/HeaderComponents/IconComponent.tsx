import React from "react";
import css from "./IconComponent.module.scss";
const IconComponent: React.FC<{
  children: React.ReactNode;
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
}> = ({ children, text, onClick }) => {
  return (
    <div className={css.icon} onClick={onClick}>
      {children}
      <br />
      <p>{text}</p>
    </div>
  );
};

export default IconComponent;
