import React from "react";
import LogoComponent from "../components/HeaderComponents/LogoComponent";
import SearchComponent from "../components/HeaderComponents/SearchComponent";
import IconComponent from "../components/HeaderComponents/IconComponent";
import { LuContact } from "react-icons/lu";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import css from "./HeaderSection.module.scss";
import ContactFromIconComponent from "../components/HeaderComponents/ContactFromIconComponent";
import { Link } from "react-router-dom";
function HeaderSection() {
  let quantity = 1;
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
        <IconComponent text="Zaloguj">
          <AiOutlineUser />
        </IconComponent>
      </Link>
      <Link to="/cart">
        <IconComponent text="Koszyk">
          {quantity === 0 ? "" : <p className={css.circle}>{quantity}</p>}
          <AiOutlineShoppingCart />
        </IconComponent>
      </Link>
    </div>
  );
}

export default HeaderSection;
