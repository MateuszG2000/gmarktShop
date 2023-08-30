import React, { useState } from "react";
import css from "./SignUp.module.scss";
import ButtonComponent from "../CommonComponents/ButtonComponent";
import * as validator from "../../utils/validators";
import useInput from "../../utils/use-input";
import Input from "./Input";
import ErrorComponent from "./ErrorComponent";
function SignUp() {
  const radioHandler = function (e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setChecked(true);
    } else setChecked(false);
  };
  const [checked, setChecked] = useState(false);
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value: string) => validator.email(value));
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
  } = useInput((value: string) => validator.isSame(value, enteredPassword));

  return (
    <div className={css.loginPanel}>
      <form className={css.loginForm}>
        <Input
          id="email-input"
          type="email"
          className="input"
          name="email"
          title="E-mail:"
          value={enteredEmail}
          valid={enteredEmailIsValid}
          touched={emailInputHasError}
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
        ></Input>
        <Input
          id="password-input"
          type="password"
          className="input"
          name="password"
          title="Hasło:"
          value={enteredPassword}
          valid={enteredPasswordIsValid}
          touched={passwordInputHasError}
          onBlur={passwordBlurHandler}
          onChange={passwordChangeHandler}
        ></Input>
        <Input
          id="password-input-confirm"
          type="password"
          className="input"
          name="password-confirm"
          title="Powtórz hasło:"
          value={enteredPasswordConfirm}
          valid={enteredPasswordConfirmIsValid}
          touched={passwordConfirmInputHasError}
          onBlur={passwordConfirmBlurHandler}
          onChange={passwordConfirmChangeHandler}
        ></Input>
        <p>
          <input
            onChange={radioHandler}
            type="checkbox"
            id="regulamin"
            name="regulamin"
          ></input>
          <label htmlFor="regulamin">Akceptuję Regulamin</label>
        </p>
        <ErrorComponent>
          {emailInputHasError && !enteredEmailIsValid && (
            <p>Nieprawidłowy e-mail</p>
          )}
          {passwordInputHasError && !enteredPasswordIsValid && (
            <p>Hasło musi zawierać od 8 do 20 znaków</p>
          )}
          {passwordConfirmInputHasError && !enteredPasswordConfirmIsValid && (
            <p>Hasła się nie zgadzają</p>
          )}
          {!checked && <p>Akceptacja regulaminu jest wymagana</p>}
        </ErrorComponent>
        <ButtonComponent
          disabled={
            !(
              enteredEmailIsValid &&
              enteredPasswordIsValid &&
              enteredPasswordConfirmIsValid &&
              checked
            )
          }
        >
          Zarejestruj się
        </ButtonComponent>
      </form>
    </div>
  );
}

export default SignUp;
