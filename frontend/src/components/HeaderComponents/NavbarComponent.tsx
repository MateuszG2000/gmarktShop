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
        to="/"
      >
        Laptopy
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? css.navLinkActive : css.navLink
        }
        to="/x"
      >
        Komputery stacjonarne
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? css.navLinkActive : css.navLink
        }
        to="/xx"
      >
        Monitory
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? css.navLinkActive : css.navLink
        }
        to="/xx"
      >
        Monitory
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? css.navLinkActive : css.navLink
        }
        to="/xx"
      >
        Monitory
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? css.navLinkActive : css.navLink
        }
        to="/cart"
      >
        Cart
      </NavLink>
    </nav>
  );
}

export default NavbarComponent;
