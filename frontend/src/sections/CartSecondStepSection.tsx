import React from "react";
import css from "./CartSecondStepSection.module.scss";
import SummaryComponent from "../components/CartComponents/SummaryComponent";
import StatusComponent from "../components/CartComponents/StatusComponent";
import DeliveryDataComponent from "../components/CartComponents/DeliveryDataComponent";
import { MdArrowForwardIos } from "react-icons/md";
import ProductListComponent from "../components/CartComponents/ProductListComponent";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../store/appHooks";
import CartEmptyInfoComponent from "../components/CartComponents/CartEmptyInfoComponent";
import { UIActions } from "../store/UI";
function CartSecondStepSection() {
  const dispatch = useAppDispatch();
  const userAddressState = useAppSelector(
    (state: RootState) => state.user.addressState
  );
  const onClick = () => {
    if (!userAddressState)
      dispatch(
        UIActions.showWarning({
          flag: "red",
          text: "Uzupełnij dane adresowe",
        })
      );
  };
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const userIsLogged = useAppSelector(
    (state: RootState) => state.user.loggedIn
  );
  return (
    <div className={css.cart}>
      <CartEmptyInfoComponent />
      <StatusComponent step={2} />
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
              buttonText={
                <>
                  Podusmowanie <MdArrowForwardIos />
                </>
              }
              buttonFunction={onClick}
              buttonPath={userAddressState ? "/cart/summary" : ""}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default CartSecondStepSection;
