import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { useAppDispatch } from "../../store/appHooks";
import Input from "../AuthComponents/Input";
import css from "./ProductsMatching.module.scss";
import ButtonComponent from "../CommonComponents/ButtonComponent";
import { UIActions } from "../../store/UI";
const initialFormData = {
  maleOptions: {
    isOn: false,
    quantity: "",
    category: "",
    weight: "",
  },
  femaleOptions: {
    isOn: false,
    quantity: "",
    category: "",
    weight: "",
  },
  cityOptions: {
    cityAdd: "",
    weight: "",
  },
  basketCategoryOptions: {
    isOn: false,
    quantity: "",
    weight: "",
  },
  basketPriceOptions: {
    isOn: false,
    quantity: "",
    weight: "",
  },
  historyCategoryOptions: {
    isOn: false,
    quantity: "",
    weight: "",
  },
  historyPriceOptions: {
    isOn: false,
    quantity: "",
    weight: "",
  },
  cities: [],
};

function ProductsMatching() {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const handleChange = (e: BaseSyntheticEvent) => {
    const { name, value, checked, type } = e.target;

    if (type === "checkbox") {
      setFormData((prevFormData: any) => {
        const [category, fieldName] = name.split("_");

        return {
          ...prevFormData,
          [category]: {
            ...prevFormData[category],
            [fieldName]: checked,
          },
        };
      });
    } else {
      setFormData((prevFormData: any) => {
        const [category, fieldName] = name.split("_");
        return {
          ...prevFormData,
          [category]: {
            ...prevFormData[category],
            [fieldName]: value,
          },
        };
      });
    }
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const onCityAdd = async function (e: BaseSyntheticEvent) {
    e.preventDefault();
    const cityName = e.target.elements.city.value;
    const weightValue = e.target.elements.weight.value;
    if (cityName.length === 0 || weightValue.length === 0) {
      dispatch(
        UIActions.showWarning({
          flag: "red",
          text: `Brak danych w formularzu.`,
        })
      );
      return;
    }
    setFormData((prevFormData: FormData) => {
      const isCityExists = prevFormData.cities.some((city) => city.name === cityName);
      if (isCityExists) {
        dispatch(
          UIActions.showWarning({
            flag: "red",
            text: `Miasto ${cityName} już istnieje w liście.`,
          })
        );
        return prevFormData;
      }

      const newCitiesList = [...prevFormData.cities, { name: cityName, weight: weightValue }];

      return {
        ...prevFormData,
        cities: newCitiesList,
      };
    });
  };
  const onCityDelete = async function (e: BaseSyntheticEvent) {
    e.preventDefault();
    const cityName = e.target.elements.city.value;
    setFormData((prevFormData: FormData) => {
      const newCitiesList = prevFormData.cities.filter((city) => city.name !== cityName);
      return {
        ...prevFormData,
        cities: newCitiesList,
      };
    });
  };

  return (
    <div className={css.panel}>
      <h1 style={{ textAlign: "center" }}>Opcje dostosowania treści</h1>
      <div className={css.title}>Ilość wyświetlanych produktów według płci:</div>
      <form>
        <div className={css.option}>
          <h4>Mężczyźni:</h4>
          <Input
            customType="switchBtn"
            name="maleOptions_isOn"
            checked={formData.maleOptions.isOn}
            onChange={handleChange}
            className="input"
            id="male-gender-input"
          />
          <Input
            customType="selectQuantity"
            name="maleOptions_quantity"
            value={formData.maleOptions.quantity}
            onChange={handleChange}
            className="input"
            id="male-quantity-input"
          />
          <Input
            customType="selectCategory"
            name="maleOptions_category"
            value={formData.maleOptions.category}
            onChange={handleChange}
            className="input"
            id="male-category-input"
          />
          <Input
            customType="selectWeight"
            name="maleOptions_weight"
            value={formData.maleOptions.weight}
            onChange={handleChange}
            className="input"
            id="male-weight-input"
          />
        </div>
      </form>
      <form>
        <div className={css.option}>
          <h4>Kobiety:</h4>

          <Input
            customType="switchBtn"
            name="femaleOptions_isOn"
            checked={formData.femaleOptions.isOn}
            onChange={handleChange}
            className="input"
            id="female-gender-input"
          />
          <Input
            customType="selectQuantity"
            name="femaleOptions_quantity"
            value={formData.femaleOptions.quantity}
            onChange={handleChange}
            className="input"
            id="female-quantity-input"
          />
          <Input
            customType="selectCategory"
            name="femaleOptions_category"
            value={formData.femaleOptions.category}
            onChange={handleChange}
            className="input"
            id="female-category-input"
          />
          <Input
            customType="selectWeight"
            name="femaleOptions_weight"
            value={formData.femaleOptions.weight}
            onChange={handleChange}
            className="input"
            id="female-weight-input"
          />
        </div>
      </form>

      <div className={css.title}>Ilość wyświetlanych produktów według miasta: </div>
      {formData.cities.length > 0 && (
        <p>
          Aktualnie zastosowane dopasowania dla miast:
          {formData.cities.map((city: City) => (
            <span key={city.name}>
              {city.name}({city.weight}),{" "}
            </span>
          ))}
        </p>
      )}
      <form onSubmit={onCityAdd}>
        <div className={css.city}>
          <Input type="text" name="city" className="input" id="city-input" placeholder="Nazwa miasta" />
          <Input customType="selectWeight" name="weight" className="input" id="city-weight-input" />
          <div style={{ width: "200px" }}>
            <ButtonComponent>Dodaj</ButtonComponent>
          </div>
        </div>
      </form>

      <form onSubmit={onCityDelete}>
        <div className={css.city}>
          <Input type="text" name="city" className="input" id="city-input" placeholder="Nazwa miasta" />
          <div style={{ width: "200px" }}>
            <ButtonComponent color={4}>Usuń</ButtonComponent>
          </div>
        </div>
      </form>

      <div className={css.title}>Wyświetlanie podobnych kategorii produktów według koszyka:</div>
      <form>
        <div className={css.option}>
          <Input
            customType="switchBtn"
            name="basketCategoryOptions_isOn"
            checked={formData.basketCategoryOptions.isOn}
            onChange={handleChange}
            className="input"
            id="basket-category-gender-input"
          />
          <Input
            customType="selectQuantity"
            name="basketCategoryOptions_quantity"
            value={formData.basketCategoryOptions.quantity}
            onChange={handleChange}
            className="input"
            id="basket-category-quantity-input"
          />
          <Input
            customType="selectWeight"
            name="basketCategoryOptions_weight"
            value={formData.basketCategoryOptions.weight}
            onChange={handleChange}
            className="input"
            id="basket-category-weight-input"
          />
        </div>
      </form>

      <div className={css.title}>Wyświetlanie produktów o podobnych cenach według koszyka:</div>
      <form>
        <div className={css.option}>
          <Input
            customType="switchBtn"
            name="basketPriceOptions_isOn"
            checked={formData.basketPriceOptions.isOn}
            onChange={handleChange}
            className="input"
            id="basket-price-gender-input"
          />
          <Input
            customType="selectQuantity"
            name="basketPriceOptions_quantity"
            value={formData.basketPriceOptions.quantity}
            onChange={handleChange}
            className="input"
            id="basket-price-quantity-input"
          />
          <Input
            customType="selectWeight"
            name="basketPriceOptions_weight"
            value={formData.basketPriceOptions.weight}
            onChange={handleChange}
            className="input"
            id="basket-price-weight-input"
          />
        </div>
      </form>

      <div className={css.title}>Wyświetlanie podobnych kategorii produktów według historii zakupów:</div>
      <form>
        <div className={css.option}>
          <Input
            customType="switchBtn"
            name="historyCategoryOptions_isOn"
            checked={formData.historyCategoryOptions.isOn}
            onChange={handleChange}
            className="input"
            id="history-category-gender-input"
          />
          <Input
            customType="selectQuantity"
            name="historyCategoryOptions_quantity"
            value={formData.historyCategoryOptions.quantity}
            onChange={handleChange}
            className="input"
            id="history-category-quantity-input"
          />
          <Input
            customType="selectWeight"
            name="historyCategoryOptions_weight"
            value={formData.historyCategoryOptions.weight}
            onChange={handleChange}
            className="input"
            id="history-category-weight-input"
          />
        </div>
      </form>

      <div className={css.title}>Wyświetlanie produktów o podobnych cenach według historii zakupów:</div>
      <form>
        <div className={css.option}>
          <Input
            customType="switchBtn"
            name="historyPriceOptions_isOn"
            checked={formData.historyPriceOptions.isOn}
            onChange={handleChange}
            className="input"
            id="history-price-gender-input"
          />
          <Input
            customType="selectQuantity"
            name="historyPriceOptions_quantity"
            value={formData.historyPriceOptions.quantity}
            onChange={handleChange}
            className="input"
            id="history-price-quantity-input"
          />
          <Input
            customType="selectWeight"
            name="historyPriceOptions_weight"
            value={formData.historyPriceOptions.weight}
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
type City = {
  name: string;
  weight: string;
};
type FormData = {
  maleOptions: {
    isOn: boolean;
    quantity: string;
    category: string;
    weight: string;
  };
  femaleOptions: {
    isOn: boolean;
    quantity: string;
    category: string;
    weight: string;
  };
  cityOptions: {
    cityAdd: string;
    weight: string;
  };
  basketCategoryOptions: {
    isOn: boolean;
    quantity: string;
    weight: string;
  };
  basketPriceOptions: {
    isOn: boolean;
    quantity: string;
    weight: string;
  };
  historyCategoryOptions: {
    isOn: boolean;
    quantity: string;
    weight: string;
  };
  historyPriceOptions: {
    isOn: boolean;
    quantity: string;
    weight: string;
  };
  cities: City[];
};
