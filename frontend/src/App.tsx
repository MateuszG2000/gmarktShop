import FooterSection from "./sections/FooterSection";
import HomeSection from "./sections/HomeSection";
import HeaderSection from "./sections/HeaderSection";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavbarComponent from "./components/HeaderComponents/NavbarComponent";
import ProductComponent from "./components/ProductComponents/ProductComponent";
import CartSection from "./sections/CartSection";
import AuthSection from "./sections/AuthSection";
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
        <CartSection />
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
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
