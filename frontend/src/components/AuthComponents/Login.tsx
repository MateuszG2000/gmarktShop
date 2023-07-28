import React, { BaseSyntheticEvent } from "react";
import * as validator from "../../utils/validators";
import css from "./Login.module.scss";
import Button from "./Button";
import Input from "./Input";
import useInput from "../../utils/use-input";
import jwt from "jwt-decode";
function Login() {
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
  const onLogIn = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    const login = event.target[0].value;
    const password = event.target[1].value;
    fetch("http://localhost:9000/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: login,
        password: password,
      }),
    })
      .then((res) => {
        if (res.status === 422) {
          console.log("Validation Falied");
          return;
        } else if (res.status === 401) {
          console.log("Wrong credentials");
          return;
        } else if (res.status === 200 || res.status === 201) {
          return res.json();
        }
      })
      .then((res) => {
        const decodedToken: {
          email: string;
          userId: string;
          iat: number;
          exp: number;
        } = jwt(res.token);
        console.log(decodedToken);
      });

    resetEmailInput();
    resetPasswordInput();
  };
  return (
    <div className={css.loginPanel} onSubmit={onLogIn}>
      <form onSubmit={onLogIn} className={css.loginForm}>
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

        <Button disabled={!(enteredEmailIsValid && enteredPasswordIsValid)}>
          Zaloguj
        </Button>
      </form>
    </div>
  );
}

export default Login;
