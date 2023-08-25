import React, { useEffect, useState } from "react";
import css from "./WarningComponent.module.scss";
import { useAppDispatch } from "../../store/appHooks";
import { UIActions } from "../../store/UI";
function WarningComponent({ text, flag }: { text: string; flag: string }) {
  const [animation, setAnimation] = useState(false);
  const dispatch = useAppDispatch();
  let flagClass;
  useEffect(() => {
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
      dispatch(UIActions.hideWarning());
    }, 5000);
  }, [dispatch]);

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
