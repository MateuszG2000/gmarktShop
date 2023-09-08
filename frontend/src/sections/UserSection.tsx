import React from "react";
import css from "./UserSection.module.scss";
import { NavLink, Outlet } from "react-router-dom";
import { IoMdReorder } from "react-icons/io";
import { RiProfileLine } from "react-icons/ri";
import { MdManageAccounts, MdOutlineManageAccounts } from "react-icons/md";
function UserSection() {
  return (
    <div className={css.panelContainer}>
      <div className={css.nav}>
        <ul>
          <NavLink
            className={({ isActive }) => (isActive ? css.active : "")}
            to="/user/orders"
          >
            <li className={css.navEl}>
              <span className={css.icon}>
                <IoMdReorder />
              </span>
              <span> Zamówienia</span>
            </li>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? css.active : "")}
            to="/user/profile"
          >
            <li className={css.navEl}>
              <span className={css.icon}>
                <RiProfileLine />
              </span>
              <span>Profil</span>
            </li>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? css.active : "")}
            to="/user/edit"
          >
            <li className={css.navEl}>
              <span className={css.icon}>
                <MdOutlineManageAccounts />
              </span>
              <span>Edytuj profil</span>
            </li>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? css.active : "")}
            to="/user/settings"
          >
            <li className={css.navEl}>
              <span className={css.icon}>
                <MdManageAccounts />
              </span>
              <span>Ustawienia konta</span>
            </li>
          </NavLink>
        </ul>
      </div>
      <div className={css.contentContainer}>
        <Outlet />
      </div>
    </div>
  );
}

export default UserSection;
