import React from "react";
import css from "./IconComponent.module.scss";
const IconComponent = ({
  children,
  text,
  onClick,
}: {
  children: React.ReactNode;
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
}) => {
  return (
    <div className={css.icon} onClick={onClick}>
      {children}
      <br />
      <p>{text}</p>
    </div>
  );
};

export default IconComponent;
