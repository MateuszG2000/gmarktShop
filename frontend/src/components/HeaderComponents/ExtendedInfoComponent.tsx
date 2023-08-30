import React, { useEffect, useRef } from "react";
import css from "./ExtendedInfoComponent.module.scss";
import ButtonComponent from "../CommonComponents/ButtonComponent";
import { Link } from "react-router-dom";
import { onLogOut } from "../../store/userAsync";
import { useAppDispatch } from "../../store/appHooks";
import { UIActions } from "../../store/UI";
import useOutsideClick from "../../utils/useOutsideClick";
function ExtendedInfoComponent() {
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(UIActions.toggleAccountExtendedInfo());
    dispatch(onLogOut());
  };

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef);
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
