import React from "react";
import css from "./SignUp.module.scss";
import Button from "../CommonComponents/Button";
import * as validator from "../../utils/validators";
import useInput from "../../utils/use-input";
import Input from "./Input";
function SignUp() {
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
  } = useInput((value: string) => validator.required(value));
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
          type="password-confirm"
          className="input"
          name="password-confirm"
          title="Powtórz hasło:"
          value={enteredPassword}
          valid={enteredPasswordIsValid}
          touched={passwordInputHasError}
          onBlur={passwordBlurHandler}
          onChange={passwordChangeHandler}
        ></Input>
        <p>
          <input type="checkbox" id="regulamin" name="regulamin"></input>
          <label htmlFor="regulamin">Akceptuję Regulamin</label>
        </p>
        <Button disabled={!(enteredEmailIsValid && enteredPasswordIsValid)}>
          Zarejestruj się
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
