import React from "react";
import LogoComponent from "../components/HeaderComponents/LogoComponent";
import { Link } from "react-router-dom";
import FooterSection from "../sections/FooterSection";
import WarningComponent from "../components/CommonComponents/WarningComponent";
import { useAppSelector } from "../store/appHooks";
import css from "./UserPage.module.scss";
import { ImExit } from "react-icons/im";
import IconComponent from "../components/HeaderComponents/IconComponent";
import UserSection from "../sections/UserSection";
function UserPage() {
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
          <UserSection />
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

export default UserPage;
