import React from "react";
import css from "./UserSection.module.scss";
import { Link } from "react-router-dom";
import { IoMdReorder } from "react-icons/io";
import { RiProfileLine } from "react-icons/ri";
import { MdManageAccounts, MdOutlineManageAccounts } from "react-icons/md";
function UserSection() {
  return (
    <div className={css.panelContainer}>
      <div className={css.nav}>
        <ul>
          <Link to="/user">
            <li className={css.navEl}>
              <span className={css.icon}>
                <IoMdReorder />
              </span>
              <span> Zamówienia</span>
            </li>
          </Link>
          <Link to="/user">
            <li className={css.navEl}>
              <span className={css.icon}>
                <RiProfileLine />
              </span>
              <span>Profil</span>
            </li>
          </Link>
          <Link to="/user">
            <li className={css.navEl}>
              <span className={css.icon}>
                <MdOutlineManageAccounts />
              </span>
              <span>Edytuj profil</span>
            </li>
          </Link>
          <Link to="/user">
            <li className={css.navEl}>
              <span className={css.icon}>
                <MdManageAccounts />
              </span>
              <span>Ustawienia konta</span>
            </li>
          </Link>
          <Link to="/user">
            <li className={css.navEl}>Ustawienia konta</li>
          </Link>
        </ul>
      </div>
      <div className={css.contentContainer}></div>
    </div>
  );
}

export default UserSection;
