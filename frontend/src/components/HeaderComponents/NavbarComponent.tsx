import React from "react";
import css from "./NavbarComponent.module.scss";
import { NavLink } from "react-router-dom";

function NavbarComponent() {
  return (
    <nav>
      <NavLink
        className={({ isActive }) =>
          isActive ? css.navLinkActive : css.navLink
        }
        to="/laptops"
      >
        Laptopy
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? css.navLinkActive : css.navLink
        }
        to="/pcs"
      >
        Komputery stacjonarne
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? css.navLinkActive : css.navLink
        }
        to="/monitors"
      >
        Monitory
      </NavLink>
    </nav>
  );
}

export default NavbarComponent;
