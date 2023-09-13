import HomeSection from "./sections/HomeSection";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductComponent from "./components/ProductComponents/ProductComponent";
import AuthSection from "./sections/AuthSection";
import CartSecondStepSection from "./sections/CartSecondStepSection";
import CartFirstStepSection from "./sections/CartFirstStepSection";
import CartThirdStepSection from "./sections/CartThirdStepSection";
import CategorySection from "./sections/CategorySection";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import UserPage from "./pages/UserPage";
import ProfileInfoComponent from "./components/UserPanelComponents/ProfileInfoComponent";
import EditProfileComponent from "./components/UserPanelComponents/EditProfileComponent";
import SettingsComponent from "./components/UserPanelComponents/SettingsComponent";
import OrderComponent from "./components/UserPanelComponents/OrderComponent";
import WelcomeComponent from "./components/UserPanelComponents/WelcomeComponent";
import ShowUsersComponent from "./components/UserPanelComponents/ShowUsersComponent";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomeSection /> },
      {
        path: "/product/:productId",
        element: <ProductComponent />,
      },
      {
        path: "cart",
        element: <CartFirstStepSection />,
      },
      {
        path: "cart/data",
        element: <CartSecondStepSection />,
      },
      {
        path: "cart/summary",
        element: <CartThirdStepSection />,
      },
      {
        path: "login",
        element: <AuthSection />,
      },
      {
        path: ":category",
        element: <CategorySection />,
      },
    ],
  },
  {
    path: "user",
    element: <UserPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <WelcomeComponent /> },
      { path: "orders", element: <OrderComponent /> },
      { path: "profile", element: <ProfileInfoComponent /> },
      { path: "edit", element: <EditProfileComponent /> },
      { path: "settings", element: <SettingsComponent /> },
      { path: "users", element: <ShowUsersComponent /> },
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
