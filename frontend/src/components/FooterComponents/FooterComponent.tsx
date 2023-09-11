import React from "react";
import css from "./FooterComponent.module.scss";
const FooterComponent = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
}) => {
  return (
    <div className={css.FooterComponent}>
      <span className={css.title}>{title}</span>
      {children}
    </div>
  );
};

export default FooterComponent;
