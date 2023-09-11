import React, { BaseSyntheticEvent, useState } from "react";
import css from "./SettingsComponent.module.scss";
import Input from "../AuthComponents/Input";
import ButtonComponent from "../CommonComponents/ButtonComponent";
import useInput from "../../utils/use-input";
import * as validator from "../../utils/validators";
import ErrorComponent from "../AuthComponents/ErrorComponent";
import { UIActions } from "../../store/UI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function SettingsComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [spinner, setSpinner] = useState(false);
  const {
    value: enteredOldPassword,
    isValid: enteredOldPasswordIsValid,
    hasError: passwordOldInputHasError,
    valueChangeHandler: passwordOldChangeHandler,
    inputBlurHandler: passwordOldBlurHandler,
    reset: resetOldPasswordInput,
  } = useInput((value: string) => validator.required(value));
  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value: string) => validator.length(value, { min: 8, max: 20 }));
  const {
    value: enteredPasswordConfirm,
    isValid: enteredPasswordConfirmIsValid,
    hasError: passwordConfirmInputHasError,
    valueChangeHandler: passwordConfirmChangeHandler,
    inputBlurHandler: passwordConfirmBlurHandler,
    reset: resetPasswordConfirmInput,
  } = useInput(
    (value: string) =>
      validator.isSame(value, enteredPassword) && validator.required(value)
  );
  const changePasswordHandler = async (event: BaseSyntheticEvent) => {
    setSpinner(true);
    event.preventDefault();
    const response = await fetch(
      "http://localhost:9000/api/auth/updatepassword",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: enteredOldPassword,
          newPassword: enteredPassword,
        }),
      }
    );
    if (response.ok) {
      dispatch(
        UIActions.showWarning({
          flag: "green",
          text: "Hasło zostało zmienione",
        })
      );
      setSpinner(false);
    }
    if (response.status === 400) {
      dispatch(
        UIActions.showWarning({
          flag: "red",
          text: "Niepoprawne aktualne hasło",
        })
      );
    }
    if (response.status === 401) {
      dispatch(
        UIActions.showWarning({
          flag: "red",
          text: "Nie jesteś zalogowany",
        })
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
    resetPasswordConfirmInput();
    resetPasswordInput();
    resetOldPasswordInput();
    setSpinner(false);
  };
  return (
    <div className={css.EditProfileContainer}>
      <span className={css.title}>Zmiana hasła</span>
      <form onSubmit={changePasswordHandler} className={css.loginForm}>
        <Input
          id="passwordOld-input"
          type="password"
          className="input"
          name="passwordOld"
          title="Aktualne hasło:"
          value={enteredOldPassword}
          valid={enteredOldPasswordIsValid}
          touched={passwordOldInputHasError}
          onBlur={passwordOldBlurHandler}
          onChange={passwordOldChangeHandler}
        />
        <Input
          id="password-input"
          type="password"
          className="input"
          name="password"
          title="Nowe hasło:"
          value={enteredPassword}
          valid={enteredPasswordIsValid}
          touched={passwordInputHasError}
          onBlur={passwordBlurHandler}
          onChange={passwordChangeHandler}
        />
        <Input
          id="passwordConfirm-input"
          type="password"
          className="input"
          name="passwordConfirm"
          title="Powtórz nowe hasło:"
          value={enteredPasswordConfirm}
          valid={enteredPasswordConfirmIsValid}
          touched={passwordConfirmInputHasError}
          onBlur={passwordConfirmBlurHandler}
          onChange={passwordConfirmChangeHandler}
        />
        <ErrorComponent>
          {passwordInputHasError && !enteredPasswordIsValid && (
            <p>Hasło musi zawierać od 8 do 20 znaków</p>
          )}
          {passwordConfirmInputHasError && !enteredPasswordConfirmIsValid && (
            <p>Hasła się nie zgadzają</p>
          )}
        </ErrorComponent>
        <ButtonComponent
          disabled={!(enteredPasswordIsValid && enteredPasswordConfirmIsValid)}
          spinner={spinner}
        >
          Zmień hasło
        </ButtonComponent>
      </form>
    </div>
  );
}
export default SettingsComponent;
