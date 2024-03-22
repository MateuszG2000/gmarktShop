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
      <div className={css.title}>Dodaj produkt:</div>
      <form onSubmit={onSubmitHandler} className={css.form}>
        <Input
          id="name-input"
          name="name-input"
          type="text"
          className="input"
          title="Nazwa produktu:"
          value={formData.name}
          onChange={(e: BaseSyntheticEvent) => setFormData({ ...formData, name: e.target.value })}
        />
        <Input
          id="name-input"
          name="name-input"
          type="text"
          className="input"
          title="Nazwa produktu:"
          value={formData.name}
          onChange={(e: BaseSyntheticEvent) => setFormData({ ...formData, name: e.target.value })}
        />
      </form>
    </div>
  );
}

export default ProductsMatching;
