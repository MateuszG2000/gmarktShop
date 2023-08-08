import React from "react";
import css from "./ErrorComponent.module.scss";
const ErrorComponent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <p className={css.title}>{children}</p>;
};
export default ErrorComponent;
