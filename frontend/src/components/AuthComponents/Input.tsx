import React from "react";
import css from "./Input.module.scss";
function Input(props: any) {
  return (
    <>
      <label htmlFor={props.name}>{props.title}</label>
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
      ></input>
    </>
  );
}

export default Input;
