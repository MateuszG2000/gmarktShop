import React from "react";
import css from "./CartThirdStepSection.module.scss";
import StatusComponent from "../components/CartComponents/StatusComponent";
import SummaryComponent from "../components/CartComponents/SummaryComponent";
import ProductListComponent from "../components/CartComponents/ProductListComponent";
import { useSelector } from "react-redux";
import { sendCartData } from "../store/cartAsync";
import { useAppDispatch, useAppSelector } from "../store/appHooks";
import CartEmptyInfoComponent from "../components/CartComponents/CartEmptyInfoComponent";
import DeliveryDataComponent from "../components/CartComponents/DeliveryDataComponent";
function CartThirdStepSection() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state: RootState) => state.cart);
  const user = useAppSelector((state: RootState) => state.user);
  const userIsLogged = useAppSelector(
    (state: RootState) => state.user.loggedIn
  );
  const handleSendData = () => {
    dispatch(sendCartData(cart, user));
  };
  return (
    <div className={css.cart}>
      <CartEmptyInfoComponent />
      <StatusComponent step={3} />
      {cartItems.length > 0 && (
        <>
          {cartItems.map((item) => (
            <ProductListComponent
              key={item._id}
              product={item}
              moreData={false}
            />
          ))}
          <div className={css.deliverySummary}>
            <DeliveryDataComponent />
            <SummaryComponent
              disable={!userIsLogged}
              buttonText={<>Zapłać</>}
              buttonPath="/"
              buttonFunction={handleSendData}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default CartThirdStepSection;
