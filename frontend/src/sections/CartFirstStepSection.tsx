import React from "react";
import DeliveryMethodComponent from "../components/CartComponents/DeliveryMethodComponent";
import ProductListComponent from "../components/CartComponents/ProductListComponent";
import StatusComponent from "../components/CartComponents/StatusComponent";
import SummaryComponent from "../components/CartComponents/SummaryComponent";
import css from "./CartFirstStepSection.module.scss";
import { MdArrowForwardIos } from "react-icons/md";
import { useSelector } from "react-redux";

function CartFirstStepSection() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  return (
    <div className={css.cart}>
      <StatusComponent step={1} />
      {cartItems.map((item) => (
        <ProductListComponent key={item._id} product={item} moreData={true} />
      ))}

      <div className={css.summaryDeliveryContainer}>
        <DeliveryMethodComponent />
        <SummaryComponent
          buttonText={
            <>
              Dalej <MdArrowForwardIos />
            </>
          }
          buttonPath="/cart/data"
        />
      </div>
    </div>
  );
}

export default CartFirstStepSection;
