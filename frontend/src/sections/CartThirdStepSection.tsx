import React from "react";
import css from "./CartThirdStepSection.module.scss";
import StatusComponent from "../components/CartComponents/StatusComponent";
import DeliveryEndDataComponent from "../components/CartComponents/DeliveryEndDataComponent";
import SummaryComponent from "../components/CartComponents/SummaryComponent";
import ProductListComponent from "../components/CartComponents/ProductListComponent";
import { useSelector } from "react-redux";
import { sendCartData } from "../store/cartActions";
import { useAppDispatch, useAppSelector } from "../store/appHooks";
import { Root } from "react-dom/client";
function CartThirdStepSection() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state: RootState) => state.cart);
  const handleSendData = () => {
    dispatch(sendCartData(cart));
  };
  return (
    <div className={css.cart}>
      <StatusComponent step={3} />
      {cartItems.map((item) => (
        <ProductListComponent key={item._id} product={item} moreData={false} />
      ))}
      <div className={css.deliverySummary}>
        <DeliveryEndDataComponent />
        <SummaryComponent
          buttonText={<>Zapłać</>}
          buttonPath="/cart/summary"
          buttonFunction={handleSendData}
        />
      </div>
    </div>
  );
}

export default CartThirdStepSection;
