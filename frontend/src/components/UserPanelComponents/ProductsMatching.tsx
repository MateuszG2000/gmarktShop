import React, { BaseSyntheticEvent, useState } from "react";
import { useAppDispatch } from "../../store/appHooks";
import Input from "../AuthComponents/Input";
import css from "./ProductsMatching.module.scss";

function ProductsMatching() {
  const [formData, setFormData] = useState<any>({});
  const dispatch = useAppDispatch();

  const handleChange = (e: BaseSyntheticEvent) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async function (e: BaseSyntheticEvent) {
    // Obsługa zdarzenia onSubmit
  };

  return (
    <div className={css.panel}>
      <div className={css.title}>Opcje dostosowania treści:</div>
      <form onSubmit={onSubmitHandler} className={css.form}>
        <div className={css.title}>Dopasowanie według płci:</div>
        <div className={css.option}>
          <Input
            customType="switchBtn"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="input"
            id="gender-input"
          />
          <Input
            customType="selectCategory"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input"
            id="category-input"
          />
          <Input
            customType="selectWeight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="input"
            id="weight-input"
          />
          <Input
            customType="selectQuantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="input"
            id="quantity-input"
          />
        </div>
      </form>
    </div>
  );
}

export default ProductsMatching;
