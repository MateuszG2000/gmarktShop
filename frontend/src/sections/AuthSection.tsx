import Login from "../components/AuthComponents/Login";
import SignUp from "../components/AuthComponents/SignUp";
import css from "./AuthSection.module.scss";
import { useState } from "react";
import Zalogowano from "../components/AuthComponents/zalogowano";
import LogOut from "../components/AuthComponents/LogOut";
function AuthSection() {
  const [pageOption, setPageOption] = useState(false);
  const buttonHanlder = (e: boolean) => {
    e ? setPageOption(true) : setPageOption(false);
  };
  const onClick = () => {
    fetch("http://localhost:9000/api/auth/", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
      });
  };
  const onLogOut = () => {
    fetch("http://localhost:9000/api/auth/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div className={css.auth}>
      <div className={css.authButtons}>
        <button
          onClick={() => {
            buttonHanlder(false);
          }}
          className={`${css.authButton} ${
            !pageOption ? css.active + " " + css.activeL : ""
          }`}
          type="button"
          name="login"
        >
          Zaloguj się
        </button>
        <button
          onClick={() => {
            buttonHanlder(true);
          }}
          name="signup"
          className={`${css.authButton} ${
            pageOption ? css.active + " " + css.activeR : ""
          }`}
          type="button"
        >
          Nowe konto
        </button>
      </div>

      {!pageOption && <Login></Login>}
      {pageOption && <SignUp></SignUp>}
      <Zalogowano btn={onClick}></Zalogowano>
      <LogOut btn={onLogOut}></LogOut>
    </div>
  );
}

export default AuthSection;
