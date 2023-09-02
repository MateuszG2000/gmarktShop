import React from "react";
import LogoComponent from "../components/HeaderComponents/LogoComponent";
import { Link, Outlet } from "react-router-dom";
import FooterSection from "../sections/FooterSection";
import WarningComponent from "../components/CommonComponents/WarningComponent";
import { useAppSelector } from "../store/appHooks";
import css from "./UserPanel.module.scss";
import { ImExit } from "react-icons/im";
import IconComponent from "../components/HeaderComponents/IconComponent";
function UserPanel() {
  const warning = useAppSelector((state: RootState) => state.UI.warning);
  return (
    <>
      <div className={css.contentPage}>
        <div className={css.header}>
          <div className={css.logo}>
            <LogoComponent type="logoNavbar" />
          </div>
          <div className={css.icon}>
            <Link to="/">
              <IconComponent text="wyjdź">
                <ImExit />
              </IconComponent>
            </Link>
          </div>
        </div>
        <main>
          <Outlet />
        </main>
      </div>
      <FooterSection />
      <div className={css.background}></div>
      {warning.visible && (
        <WarningComponent text={warning.text} flag={warning.flag} />
      )}
    </>
  );
}

export default UserPanel;
