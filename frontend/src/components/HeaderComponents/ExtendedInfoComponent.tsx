import React, { useRef } from "react";
import css from "./ExtendedInfoComponent.module.scss";
import ButtonComponent from "../CommonComponents/ButtonComponent";
import { Link } from "react-router-dom";
import { onLogOut } from "../../store/userAsync";
import { useAppDispatch, useAppSelector } from "../../store/appHooks";
import { UIActions } from "../../store/UI";
import useOutsideClick from "../../utils/useOutsideClick";
import { BsCartX } from "react-icons/bs";
function ExtendedInfoComponent() {
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(UIActions.toggleAccountExtendedInfo());
    dispatch(onLogOut());
  };
  const AccountVisible = useAppSelector(
    (state: RootState) => state.UI.headerExtendedInfo.accountInfoVisible
  );
  const CartVisible = useAppSelector(
    (state: RootState) => state.UI.headerExtendedInfo.cartInfoVisible
  );
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, UIActions.hideWindow);
  const cart = useAppSelector((state: RootState) => state.cart);
  const user = useAppSelector((state: RootState) => state.user.email);
  return (
    <div ref={wrapperRef} className={`${css.infoContainer} `}>
      {AccountVisible && (
        <>
          <p>Witaj {user}</p>
          <Link to="/user" className={css.btnLink}>
            <ButtonComponent
              onClick={() => {
                dispatch(UIActions.toggleAccountExtendedInfo());
              }}
              color={1}
            >
              Moje konto
            </ButtonComponent>
          </Link>
          <Link to="/" className={css.btnLink}>
            <ButtonComponent onClick={handleLogOut} color={2}>
              Wyloguj
            </ButtonComponent>
          </Link>
        </>
      )}
      {CartVisible && (
        <>
          {cart.totalQuantity !== 0 && (
            <>
              {cart.items.map((product) => (
                <Link to={`product/${product._id}`}>
                  <div key={product._id} className={css.productEl}>
                    <img
                      className={css.image}
                      src={`http://localhost:9000/api/images/${product.image}`}
                      alt={String(product.name)}
                    ></img>
                    <p className={css.title}>{product.name}</p>
                  </div>
                </Link>
              ))}
              <div className={css.endPrice}>
                <span className={css.endPriceTitle}>Wartość koszyka</span>
                <span className={css.price}>
                  {cart.totalPrice.toFixed(2)} zł
                </span>
              </div>
              <Link to="/cart" className={css.btnLink}>
                <ButtonComponent color={1}>Koszyk</ButtonComponent>
              </Link>
            </>
          )}

          {cart.totalQuantity === 0 && (
            <p>
              Koszyk jest pusty <BsCartX />
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default ExtendedInfoComponent;
