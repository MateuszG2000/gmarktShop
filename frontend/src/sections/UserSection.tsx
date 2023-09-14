import React from "react";
import css from "./UserSection.module.scss";
import { NavLink, Outlet } from "react-router-dom";
import { IoMdReorder } from "react-icons/io";
import { RiProfileLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { MdManageAccounts, MdOutlineManageAccounts } from "react-icons/md";
import { useAppSelector } from "../store/appHooks";
function UserSection() {
  const userType = useAppSelector((state: RootState) => state.user.type);
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
              <span>
                {" "}
                {userType === "user" ? "Zamówienia" : "Zamówienia sklepu"}
              </span>
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
          {userType === "admin" && (
            <NavLink
              className={({ isActive }) => (isActive ? css.active : "")}
              to="/user/users"
            >
              <li className={css.navEl}>
                <span className={css.icon}>
                  <FiUsers />
                </span>
                <span>Użytkownicy sklepu</span>
              </li>
            </NavLink>
          )}
          {userType === "user" && (
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
          )}
          {userType === "user" && (
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
          )}
        </ul>
      </div>
      <div className={css.contentContainer}>
        <Outlet />
      </div>
    </div>
  );
}

export default UserSection;
