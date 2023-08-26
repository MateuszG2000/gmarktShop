import React from "react";
import css from "./ExtendedInfoComponent.module.scss";
import ButtonComponent from "./ButtonComponent";
import { Link } from "react-router-dom";
import { onLogOut } from "../../store/userAsync";
import { useAppDispatch } from "../../store/appHooks";
function ExtendedInfoComponent() {
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(onLogOut());
  };
  return (
    <div className={`${css.infoContainer} `}>
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
