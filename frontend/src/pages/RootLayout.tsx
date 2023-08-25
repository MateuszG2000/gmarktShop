import { Outlet } from "react-router-dom";

import HeaderSection from "../sections/HeaderSection";
import FooterSection from "../sections/FooterSection";
import css from "./RootLayout.module.scss";
import NavbarComponent from "../components/HeaderComponents/NavbarComponent";
import { useAppSelector } from "../store/appHooks";
import WarningComponent from "../components/CommonComponents/WarningComponent";
function RootLayout() {
  // const navigation = useNavigation();
  const warning = useAppSelector((state: RootState) => state.UI.warning);

  return (
    <>
      <div className={css.contentPage}>
        <HeaderSection />
        <NavbarComponent />
        <main>
          {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
          <Outlet />
        </main>
      </div>
      <FooterSection />
      {warning.visible && (
        <WarningComponent text={warning.text} flag={warning.flag} />
      )}
    </>
  );
}

export default RootLayout;
