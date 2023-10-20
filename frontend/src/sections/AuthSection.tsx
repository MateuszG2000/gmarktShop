import Login from "../components/AuthComponents/Login";
import SignUp from "../components/AuthComponents/SignUp";
import css from "./AuthSection.module.scss";
import { useState } from "react";
function AuthSection() {
  const [pageOption, setPageOption] = useState(false);
  const buttonHanlder = (e: boolean) => {
    e ? setPageOption(true) : setPageOption(false);
  };

  return (
    <div className={css.auth}>
      <div className={css.authButtons}>
        <button
          aria-label="zaloguj"
          onClick={() => {
            buttonHanlder(false);
          }}
          className={`${css.authButton} ${!pageOption ? css.active + " " + css.activeL : ""}`}
          type="button"
          name="login"
        >
          Zaloguj się
        </button>
        <button
          aria-label="Zarajestruj sie"
          onClick={() => {
            buttonHanlder(true);
          }}
          name="signup"
          className={`${css.authButton} ${pageOption ? css.active + " " + css.activeR : ""}`}
          type="button"
        >
          Nowe konto
        </button>
      </div>

      {!pageOption && <Login></Login>}
      {pageOption && <SignUp></SignUp>}
    </div>
  );
}

export default AuthSection;
