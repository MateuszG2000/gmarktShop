import React from "react";
import css from "./FooterComponent.module.scss";
const FooterComponent: React.FC<{
  children: React.ReactNode;
  title: React.ReactNode;
}> = ({ children, title }) => {
  return (
    <div className={css.FooterComponent}>
      <span className={css.title}>{title}</span>
      {children}
    </div>
  );
};

export default FooterComponent;
