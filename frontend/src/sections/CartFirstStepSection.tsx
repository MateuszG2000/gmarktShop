import React from "react";
import DeliveryMethodComponent from "../components/CartComponents/DeliveryMethodComponent";
import ProductListComponent from "../components/CartComponents/ProductListComponent";
import StatusComponent from "../components/CartComponents/StatusComponent";
import SummaryComponent from "../components/CartComponents/SummaryComponent";
import css from "./CartFirstStepSection.module.scss";
import { MdArrowForwardIos } from "react-icons/md";
import { useSelector } from "react-redux";
import ButtonComponent from "../components/CommonComponents/ButtonComponent";
import { BsCartX } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/appHooks";

function CartFirstStepSection() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const userIsLogged = useAppSelector(
    (state: RootState) => state.user.loggedIn
  );
  return (
    <div className={css.cart}>
      {cartItems.length === 0 && (
        <div className={css.empty}>
          <span className={css.emptyCartText}>
            Twój koszyk jest pusty
            <span className={css.icon}>
              <BsCartX />
            </span>
          </span>
          <div>
            <Link to="/">
              <ButtonComponent disabled={false}>
                Wróć na strone główną
              </ButtonComponent>
            </Link>
          </div>
        </div>
      )}

      {cartItems.length > 0 && (
        <>
          <StatusComponent step={1} />
          {cartItems.map((item) => (
            <ProductListComponent
              key={item._id}
              product={item}
              moreData={true}
            />
          ))}

          <div className={css.summaryDeliveryContainer}>
            <DeliveryMethodComponent />
            <SummaryComponent
              disable={!userIsLogged}
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
