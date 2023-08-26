import React, { useEffect, useRef } from "react";
import css from "./ExtendedInfoComponent.module.scss";
import ButtonComponent from "../CommonComponents/ButtonComponent";
import { Link } from "react-router-dom";
import { onLogOut } from "../../store/userAsync";
import { useAppDispatch } from "../../store/appHooks";
import { UIActions } from "../../store/UI";
function ExtendedInfoComponent() {
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(UIActions.toggleAccountExtendedInfo());
    dispatch(onLogOut());
  };
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          dispatch(UIActions.toggleAccountExtendedInfo());
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  return (
    <div ref={wrapperRef} className={`${css.infoContainer} `}>
      <p className={css.title}>Witaj Mateusz</p>
      <Link to="/" className={css.btnLink}>
        <ButtonComponent color={1}>Moje konto</ButtonComponent>
      </Link>
      <Link to="/" className={css.btnLink}>
        <ButtonComponent onClick={handleLogOut} color={2}>
          Wyloguj
        </ButtonComponent>
      </Link>
    </div>
  );
}

export default ExtendedInfoComponent;
