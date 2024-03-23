import React, { BaseSyntheticEvent, useState } from "react";
import { useAppDispatch } from "../../store/appHooks";
import Input from "../AuthComponents/Input";
import css from "./ProductsMatching.module.scss";
function ProductsMatching() {
  const [formData, setFormData] = useState<any>({});
  const dispatch = useAppDispatch();
  const onSubmitHandler = async function (e: BaseSyntheticEvent) {};

  return (
    <div className={css.panel}>
      <div className={css.title}>Opcje dostosowania treści:</div>
      <form onSubmit={onSubmitHandler} className={css.form}>
        <div className={css.title}>Dopasowanie według płci:</div>
        <div className={css.option}>
          <label className={css.switch}>
            <input type="checkbox" />
            <span className={`${css.slider} ${css.round}`}></span>
          </label>
          <span>Mężczyzna: </span>
          <select
            id="quantity-input"
            name="quantity-input"
            className="input"
            value={formData.quantity}
            onChange={(e: BaseSyntheticEvent) => setFormData({ ...formData, quantity: e.target.value })}
          >
            <option value="">Ilość</option>
            <option value="more">więcej</option>
            <option value="less">mniej</option>
          </select>
          <select
            id="category-input"
            name="category-input"
            className="input"
            value={formData.category}
            onChange={(e: BaseSyntheticEvent) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="">Kategoria</option>
            <option value="pcs">Komputery stacjonarne</option>
            <option value="monitors">Monitory</option>
            <option value="laptops">Laptopy</option>
            <option value="headphones">Słuchawki</option>
            <option value="phones">Smartfony</option>
            <option value="accessories">Akcesoria</option>
          </select>
          <select
            id="weight-input"
            name="weight-input"
            className="input"
            value={formData.weight}
            onChange={(e: BaseSyntheticEvent) => setFormData({ ...formData, weight: e.target.value })}
          >
            <option value="">Waga</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default ProductsMatching;
