import React from "react";
import css from "./NavbarComponent.module.scss";
import { NavLink } from "react-router-dom";

function NavbarComponent() {
  const categories = {
    pcs: "Komputery stacjonarne",
    monitors: "Monitory",
    laptops: "Laptopy",
    headphones: "Słuchawki",
    phones: "Smartfony",
    accessories: "Akcesoria",
  };

  return (
    <nav>
      {Object.entries(categories).map(([key, value], index) => (
        <NavLink key={index} className={({ isActive }) => (isActive ? css.navLinkActive : css.navLink)} to={`/${key}`}>
          {value}
        </NavLink>
      ))}
    </nav>
  );
}

export default NavbarComponent;
