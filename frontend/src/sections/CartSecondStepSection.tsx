import React, { useState } from "react";
import css from "./CartSecondStepSection.module.scss";
import SummaryComponent from "../components/CartComponents/SummaryComponent";
import StatusComponent from "../components/CartComponents/StatusComponent";
import DeliveryDataComponent from "../components/CartComponents/DeliveryDataComponent";
import { MdArrowForwardIos } from "react-icons/md";
import ProductListComponent from "../components/CartComponents/ProductListComponent";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart";
function CartSecondStepSection() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [address, setAddress] = useState<Address>();
  const formHandler = (prop: Address) => {
    setAddress(prop);
  };
  const submitFormHandler = () => {
    dispatch(cartActions.setAddress({ address }));
  };
  return (
    <div className={css.cart}>
      <StatusComponent step={2} />
      {cartItems.map((item) => (
        <ProductListComponent key={item._id} product={item} moreData={false} />
      ))}
      <div className={css.deliverySummary}>
        <DeliveryDataComponent formHandler={formHandler} />
        <SummaryComponent
          buttonText={
            <>
              Podusmowanie <MdArrowForwardIos />
            </>
          }
          buttonPath="/cart/summary"
          buttonFunction={submitFormHandler}
        />
      </div>
    </div>
  );
}

export default CartSecondStepSection;
