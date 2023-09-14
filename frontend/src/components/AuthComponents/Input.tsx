import React, { ChangeEventHandler, FocusEventHandler } from "react";
import css from "./Input.module.scss";

function Input(props: InputProps) {
  return (
    <>
      {props.title !== undefined && (
        <label htmlFor={props.name}>{props.title}</label>
      )}
      <input
        id={props.id}
        className={`${css[props.className]} ${
          !props.valid ? css.invalid : ""
        } ${props.touched ? css.touched : ""}`}
        type={props.type}
        name={props.name}
        value={props.value}
        onBlur={props.onBlur}
        onChange={props.onChange}
        placeholder={props.placeholder}
        step={props?.step}
      ></input>
    </>
  );
}

export default Input;
type InputProps = {
  name: string;
  title?: string;
  className: string;
  valid?: boolean;
  touched?: boolean;
  id: string;
  type: string;
  value: string;
  placeholder?: string;
  step?: number;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};
