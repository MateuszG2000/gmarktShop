import { Outlet } from "react-router-dom";

import HeaderSection from "../sections/HeaderSection";
import FooterSection from "../sections/FooterSection";
import css from "./RootLayout.module.scss";
import NavbarComponent from "../components/HeaderComponents/NavbarComponent";
function RootLayout() {
  // const navigation = useNavigation();

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
    </>
  );
}

export default RootLayout;
