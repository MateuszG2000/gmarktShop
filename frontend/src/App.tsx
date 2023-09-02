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
import UserSection from "./sections/UserSection";
import UserPanel from "./pages/UserPanel";
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
    element: <UserPanel />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <UserSection /> }],
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
