import React from "react";
import css from "./SpinnerComponent.module.scss";
function SpinnerComponent({
  size,
  loading,
}: {
  size: number;
  loading: boolean;
}) {
  return (
    <span
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: `${size / 12}px`,
      }}
      className={`${css.loader} ${loading ? css.loading : css.loaded}`}
    ></span>
  );
}

export default SpinnerComponent;
