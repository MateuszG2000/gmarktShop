import React from "react";
import css from "./ErrorComponent.module.scss";
const ErrorComponent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className={css.title}>{children}</div>;
};
export default ErrorComponent;
