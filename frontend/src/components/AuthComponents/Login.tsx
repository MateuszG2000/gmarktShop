import React, { BaseSyntheticEvent, useState } from "react";
import * as validator from "../../utils/validators";
import css from "./Login.module.scss";
import ButtonComponent from "../CommonComponents/ButtonComponent";
import Input from "./Input";
import useInput from "../../utils/use-input";
import jwt from "jwt-decode";
import ErrorComponent from "./ErrorComponent";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/appHooks";
import { userActions } from "../../store/user";
import { UIActions } from "../../store/UI";
function Login() {
  const dispatch = useAppDispatch();
  const [error, setError] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();

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

  const loginHandler = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    const login = event.target[0].value;
    const password = event.target[1].value;
    setSpinner(true);
    fetch(`${process.env.REACT_APP_URL}/api/auth/login`, {
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
        if (!res.ok) {
          const err = new Error(res.statusText);
          err.statusCode = res.status;
          throw err;
        } else if (res.status === 200 || res.status === 201) {
          return res.json();
        }
      })
      .then((res) => {
        const userData: {
          email: string;
          userId: string;
          exp: number;
          type: string;
          address: Address;
        } = jwt(res.token);
        userData.type = res.type;
        userData.address = res.address;
        dispatch(userActions.logIn(userData));
        dispatch(UIActions.showWarning({ flag: "green", text: "Zalogowano" }));
        setSpinner(false);
        setError(false);
        navigate("/");
      })
      .catch((err) => {
        if (err.statusCode === 401)
          dispatch(
            UIActions.showWarning({
              flag: "red",
              text: "Niepoprawne dane logowania",
            })
          );
        else
          dispatch(
            UIActions.showWarning({
              flag: "red",
              text: "Błąd serwera",
            })
          );
        setError(true);
        emailBlurHandler();
        passwordBlurHandler();
        setSpinner(false);
      });
    resetEmailInput();
    resetPasswordInput();
  };

  const InputsObj = [
    {
      id: "email-input",
      type: "email",
      className: "input",
      name: "email",
      title: "E-mail:",
      value: enteredEmail,
      valid: enteredEmailIsValid,
      touched: emailInputHasError,
      onBlur: emailBlurHandler,
      onChange: emailChangeHandler,
    },
    {
      id: "password-input",
      type: "password",
      className: "input",
      name: "password",
      title: "Hasło:",
      value: enteredPassword,
      valid: enteredPasswordIsValid,
      touched: passwordInputHasError,
      onBlur: passwordBlurHandler,
      onChange: passwordChangeHandler,
    },
  ];

  return (
    <div className={css.loginPanel}>
      <form onSubmit={loginHandler} className={css.loginForm}>
        {InputsObj.map((input) => (
          <Input
            key={input.id}
            id={input.id}
            type={input.type}
            className={input.className}
            name={input.name}
            title={input.title}
            value={input.value}
            valid={input.valid}
            touched={input.touched}
            onBlur={input.onBlur}
            onChange={input.onChange}
          ></Input>
        ))}

        {error && <ErrorComponent>Niepoprawny login lub hasło</ErrorComponent>}
        <ButtonComponent
          disabled={!(enteredEmailIsValid && enteredPasswordIsValid)}
          spinner={spinner}
        >
          Zaloguj
        </ButtonComponent>
      </form>
    </div>
  );
}

export default Login;
