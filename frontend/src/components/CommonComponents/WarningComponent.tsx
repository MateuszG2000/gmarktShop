import React, { useEffect, useState } from "react";
import css from "./WarningComponent.module.scss";
function WarningComponent({ text, flag }: { text: string; flag: string }) {
  const [animation, setAnimation] = useState(false);
  let flagClass;
  useEffect(() => {
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
    }, 5000);
  }, []);

  const flagClassMap: { [key: string]: string } = {
    red: "flag-red",
    green: "flag-green",
    yellow: "flag-yellow",
  };

  flagClass = flagClassMap[flag] || "";

  return (
    <div className={`${css.warningContainer} ${animation ? css.animate : ""}`}>
      <div className={`${css.flag} ${css[flagClass]}`}></div>
      <div className={css.title}>{text}</div>
    </div>
  );
}
export default WarningComponent;
