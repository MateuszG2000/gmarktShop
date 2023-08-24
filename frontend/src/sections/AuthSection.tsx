import Login from "../components/AuthComponents/Login";
import SignUp from "../components/AuthComponents/SignUp";
import css from "./AuthSection.module.scss";
import { useState } from "react";
import Zalogowano from "../components/AuthComponents/zalogowano";
import LogOut from "../components/AuthComponents/LogOut";
import { useCookies } from "react-cookie";
import { useAppDispatch } from "../store/appHooks";
import { userActions } from "../store/user";
function AuthSection() {
  const [cookie, setCookie, removeCookie] = useCookies(["AuthConfirm"]);
  const dispatch = useAppDispatch();
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
        console.log(res); ////login action
      });
  };
  const onLogOut = async () => {
    removeCookie("AuthConfirm");
    dispatch(userActions.logOut());
    try {
      const res = await (
        await fetch("http://localhost:9000/api/auth/logout", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();
      console.log(res.message); ///////logout action
    } catch (err: any) {
      console.log(err.message);
    }
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
