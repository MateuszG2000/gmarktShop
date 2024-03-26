import React, { ChangeEventHandler, FocusEventHandler } from "react";
import css from "./Input.module.scss";

function Input(props: InputProps) {
  let markup;
  const normalInput = (
    <>
      {props.title !== undefined && <label htmlFor={props.name}>{props.title}</label>}
      <input
        id={props.id}
        className={`${css[props.className]} ${!props.valid ? css.invalid : ""} ${props.touched ? css.touched : ""}`}
        type={props.type}
        name={props.name}
        value={props.value}
        checked={props.checked}
        onBlur={props.onBlur}
        onChange={props.onChange}
        placeholder={props.placeholder}
        step={props?.step}
        min={props?.min}
        max={props?.max}
      ></input>
    </>
  );
  const selectCategory = (
    <select
      id={props.id}
      className={`${css[props.className]} ${!props.valid ? css.invalid : ""} ${props.touched ? css.touched : ""}`}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
    >
      <option value="">Kategoria</option>
      <option value="pcs">Komputery stacjonarne</option>
      <option value="monitors">Monitory</option>
      <option value="laptops">Laptopy</option>
      <option value="headphones">Słuchawki</option>
      <option value="phones">Smartfony</option>
      <option value="accessories">Akcesoria</option>
    </select>
  );
  const selectWeight = (
    <select
      id={props.id}
      className={`${css[props.className]} ${!props.valid ? css.invalid : ""} ${props.touched ? css.touched : ""}`}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
    >
      <option value="">Waga</option>
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={4}>4</option>
      <option value={5}>5</option>
    </select>
  );
  const selectQuantity = (
    <select
      id={props.id}
      className={`${css[props.className]} ${!props.valid ? css.invalid : ""} ${props.touched ? css.touched : ""}`}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
    >
      <option value="">Ilość</option>
      <option value="more">więcej</option>
      <option value="less">mniej</option>
    </select>
  );

  const switchBtn = (
    <label className={css.switch}>
      <input name={props.name} checked={props.checked} onChange={props.onChange} type="checkbox" />
      <span className={`${css.slider} ${css.round}`}></span>
    </label>
  );
  console.log();
  if (props.customType === "selectCategory") markup = selectCategory;
  else if (props.customType === "selectWeight") markup = selectWeight;
  else if (props.customType === "selectQuantity") markup = selectQuantity;
  else if (props.customType === "switchBtn") markup = switchBtn;
  else markup = normalInput;
  return markup;
}

export default Input;
type InputProps = {
  customType?: string;
  name: string;
  title?: string;
  className: string;
  valid?: boolean;
  touched?: boolean;
  id: string;
  type?: string;
  value?: string;
  checked?: boolean;
  placeholder?: string;
  step?: number;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLSelectElement>;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  min?: number;
  max?: number;
};
