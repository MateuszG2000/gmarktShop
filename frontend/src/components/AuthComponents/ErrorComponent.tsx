import React from "react";
import css from "./ErrorComponent.module.scss";
const ErrorComponent = ({ children }: { children: React.ReactNode }) => {
  return <div className={css.title}>{children}</div>;
};
export default ErrorComponent;
