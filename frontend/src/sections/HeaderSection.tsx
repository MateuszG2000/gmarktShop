import React, { useEffect, useState } from "react";
import LogoComponent from "../components/HeaderComponents/LogoComponent";
import SearchComponent from "../components/HeaderComponents/SearchComponent";
import IconComponent from "../components/HeaderComponents/IconComponent";
import { LuContact } from "react-icons/lu";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import css from "./HeaderSection.module.scss";
import ContactFromIconComponent from "../components/HeaderComponents/ContactFromIconComponent";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppSelector } from "../store/appHooks";
import ExtendedInfoComponent from "../components/CommonComponents/ExtendedInfoComponent";
function HeaderSection() {
  const [animation, setAnimation] = useState(false);
  const [prevQuantity, setPrevQuantity] = useState(0);

  const quantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const userLoggedIn = useAppSelector(
    (state: RootState) => state.user.loggedIn
  );
  useEffect(() => {
    if (Number(quantity) !== Number(prevQuantity)) {
      setAnimation(true);
      setPrevQuantity(quantity);
      setTimeout(() => {
        setAnimation(false);
      }, 350);
    }
  }, [quantity, prevQuantity]);

  return (
    <div className={css.header}>
      <Link to="/">
        <LogoComponent type="logoNavbar" />
      </Link>
      <SearchComponent />
      <div className={css.contact}>
        <IconComponent text="Kontakt">
          <LuContact />
        </IconComponent>
        <ContactFromIconComponent />
      </div>
      <Link to="/login">
        <IconComponent text={!userLoggedIn ? "Zaloguj się" : "Moje konto"}>
          <AiOutlineUser />
        </IconComponent>
      </Link>
      <ExtendedInfoComponent />
      <Link to="/cart">
        <IconComponent text="Koszyk">
          {quantity <= 0 ? (
            ""
          ) : (
            <p className={`${css.circle} ${animation ? css.animate : ""}`}>
              {quantity}
            </p>
          )}
          <AiOutlineShoppingCart />
        </IconComponent>
      </Link>
    </div>
  );
}
export default HeaderSection;
