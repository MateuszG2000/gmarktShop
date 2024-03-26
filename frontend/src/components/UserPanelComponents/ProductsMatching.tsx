import React, { BaseSyntheticEvent, useState } from "react";
import { useAppDispatch } from "../../store/appHooks";
import Input from "../AuthComponents/Input";
import css from "./ProductsMatching.module.scss";
import ButtonComponent from "../CommonComponents/ButtonComponent";

function ProductsMatching() {
  const [formData, setFormData] = useState<any>({});
  const dispatch = useAppDispatch();

  const handleChange = (e: BaseSyntheticEvent) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const onSubmitHandler = async function (e: BaseSyntheticEvent) {};

  return (
    <div className={css.panel}>
      <h1 style={{ textAlign: "center" }}>Opcje dostosowania treści</h1>
      <form onSubmit={onSubmitHandler} className={css.form}>
        <div className={css.title}>Ilość wyświetlanych produktów według płci:</div>
        <div className={css.option}>
          <h4>Mężczyźni:</h4>
          <Input
            customType="switchBtn"
            name="maleGender"
            value={formData.maleGender}
            onChange={handleChange}
            className="input"
            id="male-gender-input"
          />
          <Input
            customType="selectQuantity"
            name="maleQuantity"
            value={formData.maleQuantity}
            onChange={handleChange}
            className="input"
            id="male-quantity-input"
          />
          <Input
            customType="selectCategory"
            name="maleCategory"
            value={formData.maleCategory}
            onChange={handleChange}
            className="input"
            id="male-category-input"
          />
          <Input
            customType="selectWeight"
            name="maleWeight"
            value={formData.maleWeight}
            onChange={handleChange}
            className="input"
            id="male-weight-input"
          />
        </div>
        <div className={css.option}>
          <h4>Kobiety:</h4>

          <Input
            customType="switchBtn"
            name="femaleGender"
            value={formData.femaleGender}
            onChange={handleChange}
            className="input"
            id="female-gender-input"
          />
          <Input
            customType="selectQuantity"
            name="femaleQuantity"
            value={formData.femaleQuantity}
            onChange={handleChange}
            className="input"
            id="female-quantity-input"
          />
          <Input
            customType="selectCategory"
            name="femaleCategory"
            value={formData.femaleCategory}
            onChange={handleChange}
            className="input"
            id="female-category-input"
          />
          <Input
            customType="selectWeight"
            name="femaleWeight"
            value={formData.femaleWeight}
            onChange={handleChange}
            className="input"
            id="female-weight-input"
          />
        </div>
        <div className={css.title}>Ilość wyświetlanych produktów według miasta:</div>
        <p>
          Aktualnie zastosowane dopasowania dla miast:<span> Bytom (5)</span>
        </p>
        <div className={css.city}>
          <Input
            type="text"
            name="cityAdd"
            value={formData.cityAdd}
            onChange={handleChange}
            className="input"
            id="cityAdd-input"
            placeholder="Nazwa miasta"
          />
          <Input
            customType="selectWeight"
            name="cityWeight"
            value={formData.cityWeight}
            onChange={handleChange}
            className="input"
            id="city-weight-input"
          />
          <div style={{ width: "200px" }}>
            <ButtonComponent>Dodaj</ButtonComponent>
          </div>
        </div>
        <div className={css.city}>
          <Input
            type="text"
            name="cityAdd"
            value={formData.cityAdd}
            onChange={handleChange}
            className="input"
            id="cityAdd-input"
            placeholder="Nazwa miasta"
          />
          <div style={{ width: "200px" }}>
            <ButtonComponent color={4}>Usuń</ButtonComponent>
          </div>
        </div>

        <div className={css.title}>Wyświetlanie podobnych kategorii produktów według koszyka:</div>
        <div className={css.option}>
          <Input
            customType="switchBtn"
            name="basketCategoryGender"
            value={formData.basketCategoryGender}
            onChange={handleChange}
            className="input"
            id="basket-category-gender-input"
          />
          <Input
            customType="selectQuantity"
            name="basketCategoryQuantity"
            value={formData.basketCategoryQuantity}
            onChange={handleChange}
            className="input"
            id="basket-category-quantity-input"
          />
          <Input
            customType="selectWeight"
            name="basketCategoryWeight"
            value={formData.basketCategoryWeight}
            onChange={handleChange}
            className="input"
            id="basket-category-weight-input"
          />
        </div>

        <div className={css.title}>Wyświetlanie produktów o podobnych cenach według koszyka:</div>
        <div className={css.option}>
          <Input
            customType="switchBtn"
            name="basketPriceGender"
            value={formData.basketPriceGender}
            onChange={handleChange}
            className="input"
            id="basket-price-gender-input"
          />
          <Input
            customType="selectQuantity"
            name="basketPriceQuantity"
            value={formData.basketPriceQuantity}
            onChange={handleChange}
            className="input"
            id="basket-price-quantity-input"
          />
          <Input
            customType="selectWeight"
            name="basketPriceWeight"
            value={formData.basketPriceWeight}
            onChange={handleChange}
            className="input"
            id="basket-price-weight-input"
          />
        </div>

        <div className={css.title}>Wyświetlanie podobnych kategorii produktów według historii zakupów:</div>
        <div className={css.option}>
          <Input
            customType="switchBtn"
            name="historyCategoryGender"
            value={formData.historyCategoryGender}
            onChange={handleChange}
            className="input"
            id="history-category-gender-input"
          />
          <Input
            customType="selectQuantity"
            name="historyCategoryQuantity"
            value={formData.historyCategoryQuantity}
            onChange={handleChange}
            className="input"
            id="history-category-quantity-input"
          />
          <Input
            customType="selectWeight"
            name="historyCategoryWeight"
            value={formData.historyCategoryWeight}
            onChange={handleChange}
            className="input"
            id="history-category-weight-input"
          />
        </div>

        <div className={css.title}>Wyświetlanie produktów o podobnych cenach według historii zakupów:</div>
        <div className={css.option}>
          <Input
            customType="switchBtn"
            name="historyPriceGender"
            value={formData.historyPriceGender}
            onChange={handleChange}
            className="input"
            id="history-price-gender-input"
          />
          <Input
            customType="selectQuantity"
            name="historyPriceQuantity"
            value={formData.historyPriceQuantity}
            onChange={handleChange}
            className="input"
            id="history-price-quantity-input"
          />
          <Input
            customType="selectWeight"
            name="historyPriceWeight"
            value={formData.historyPriceWeight}
            onChange={handleChange}
            className="input"
            id="history-price-weight-input"
          />
        </div>
      </form>
    </div>
  );
}

export default ProductsMatching;
