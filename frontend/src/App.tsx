import FooterSection from "./sections/FooterSection";
import HomeSection from "./sections/HomeSection";
import HeaderSection from "./sections/HeaderSection";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavbarComponent from "./components/HeaderComponents/NavbarComponent";
import ProductComponent from "./components/ProductComponents/ProductComponent";
import AuthSection from "./sections/AuthSection";
import CartSecondStepSection from "./sections/CartSecondStepSection";
import CartFirstStepSection from "./sections/CartFirstStepSection";
import CartThirdStepSection from "./sections/CartThirdStepSection";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        {" "}
        <HeaderSection />
        <NavbarComponent />
        {/* <HomeSection /> */}
        <FooterSection />
      </>
    ),
  },
  {
    path: "/x",
    element: (
      <>
        {" "}
        <HeaderSection />
        {/* <HomeSection /> */}
        <NavbarComponent />
        <ProductComponent />
        <FooterSection />
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
        {" "}
        <HeaderSection />
        <CartFirstStepSection />
        <FooterSection />
      </>
    ),
  },
  {
    path: "/log",
    element: (
      <>
        {" "}
        <HeaderSection />
        <AuthSection />
        <FooterSection />
      </>
    ),
  },
  {
    path: "/cart/data",
    element: (
      <>
        <HeaderSection />
        <CartSecondStepSection />
        <FooterSection />
      </>
    ),
  },
  {
    path: "/cart/summary",
    element: (
      <>
        <HeaderSection />
        <CartThirdStepSection />
        <FooterSection />
      </>
    ),
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
