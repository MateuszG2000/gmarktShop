import { Outlet } from "react-router-dom";

import HeaderSection from "../sections/HeaderSection";
import FooterSection from "../sections/FooterSection";
import NavbarComponent from "../components/HeaderComponents/NavbarComponent";

function RootLayout() {
  // const navigation = useNavigation();

  return (
    <>
      <HeaderSection />
      <NavbarComponent />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
      <FooterSection />
    </>
  );
}

export default RootLayout;
