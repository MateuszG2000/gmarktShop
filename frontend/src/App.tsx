import HomeSection from "./sections/HomeSection";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import ProductComponent from "./components/ProductComponents/ProductComponent";
import AuthSection from "./sections/AuthSection";
// import CartSecondStepSection from "./sections/CartSecondStepSection";
// import CartFirstStepSection from "./sections/CartFirstStepSection";
// import CartThirdStepSection from "./sections/CartThirdStepSection";
import RootLayout from "./pages/RootLayout";
import ProfileInfoComponent from "./components/UserPanelComponents/ProfileInfoComponent";
import EditProfileComponent from "./components/UserPanelComponents/EditProfileComponent";
import SettingsComponent from "./components/UserPanelComponents/SettingsComponent";
import OrderComponent from "./components/UserPanelComponents/OrderComponent";
import WelcomeComponent from "./components/UserPanelComponents/WelcomeComponent";
import ShowUsersComponent from "./components/UserPanelComponents/ShowUsersComponent";
import ShippingSettingsComponent from "./components/UserPanelComponents/ShippingSettingsComponent";
import AddProductComponent from "./components/UserPanelComponents/AddProductComponent";
import { lazy, Suspense } from "react";
import SpinnerComponent from "./components/CommonComponents/SpinnerComponent";
const UserPage = lazy(() => import("./pages/UserPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const CategorySection = lazy(() => import("./sections/CategorySection"));
const CartSecondStepSection = lazy(() => import("./sections/CartSecondStepSection"));
const CartFirstStepSection = lazy(() => import("./sections/CartFirstStepSection"));
const CartThirdStepSection = lazy(() => import("./sections/CartThirdStepSection"));
const ProductComponent = lazy(() => import("./components/ProductComponents/ProductComponent"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: (
      <Suspense fallback={<SpinnerComponent size={48} loading={true} />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      { index: true, element: <HomeSection /> },
      {
        path: "/product/:productId",
        element: (
          <Suspense fallback={<SpinnerComponent size={48} loading={true} />}>
            <ProductComponent />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <Suspense fallback={<SpinnerComponent size={48} loading={true} />}>
            <CartFirstStepSection />
          </Suspense>
        ),
      },
      {
        path: "cart/data",
        element: (
          <Suspense fallback={<SpinnerComponent size={48} loading={true} />}>
            <CartSecondStepSection />
          </Suspense>
        ),
      },
      {
        path: "cart/summary",
        element: (
          <Suspense fallback={<SpinnerComponent size={48} loading={true} />}>
            <CartThirdStepSection />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: <AuthSection />,
      },
      {
        path: ":category",
        element: (
          <Suspense fallback={<SpinnerComponent size={48} loading={true} />}>
            <CategorySection />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "user",
    element: (
      <Suspense fallback={<SpinnerComponent size={48} loading={true} />}>
        <UserPage />,
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<SpinnerComponent size={48} loading={true} />}>
        <ErrorPage />,
      </Suspense>
    ),
    children: [
      { index: true, element: <WelcomeComponent /> },
      { path: "orders", element: <OrderComponent /> },
      { path: "profile", element: <ProfileInfoComponent /> },
      { path: "edit", element: <EditProfileComponent /> },
      { path: "settings", element: <SettingsComponent /> },
      { path: "users", element: <ShowUsersComponent /> },
      { path: "shippingsettings", element: <ShippingSettingsComponent /> },
      { path: "addproduct", element: <AddProductComponent /> },
    ],
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
