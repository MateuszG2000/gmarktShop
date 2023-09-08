import React from "react";
import css from "./NotAuthComponent.module.scss";
function NotAuthComponent() {
  return <div className={css.info}>Nie masz uprawnień do tych danych</div>;
}

export default NotAuthComponent;
