import React from "react";
import DeliveryMethodComponent from "../components/CartComponents/DeliveryMethodComponent";
import ProductListComponent from "../components/CartComponents/ProductListComponent";
import StatusComponent from "../components/CartComponents/StatusComponent";
import SummaryComponent from "../components/CartComponents/SummaryComponent";
import css from "./CartFirstStepSection.module.scss";
import { MdArrowForwardIos } from "react-icons/md";
import { useSelector } from "react-redux";
import { useAppSelector } from "../store/appHooks";
import CartEmptyInfoComponent from "../components/CartComponents/CartEmptyInfoComponent";

function CartFirstStepSection() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const userIsLogged = useAppSelector((state: RootState) => state.user.loggedIn);
  console.log(cartItems);

  const user = useAppSelector((state: RootState) => state.user);

  return (
    <div className={css.cart}>
      <CartEmptyInfoComponent />

      {cartItems.length > 0 && (
        <>
          <StatusComponent step={1} />
          {cartItems.map((item) => (
            <ProductListComponent key={item._id} product={item} moreData={true} />
          ))}

          <div className={css.summaryDeliveryContainer}>
            <DeliveryMethodComponent />
            <SummaryComponent
              disable={!userIsLogged || user.type === "admin"}
              buttonText={
                <>
                  Dalej <MdArrowForwardIos />
                </>
              }
              buttonPath="/cart/data"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default CartFirstStepSection;
