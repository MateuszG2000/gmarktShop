import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import css from "./EditProfileComponent.module.scss";
import Input from "../AuthComponents/Input";
import ButtonComponent from "../CommonComponents/ButtonComponent";
import { useDispatch } from "react-redux";
import { UIActions } from "../../store/UI";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../store/user";
function EditProfileComponent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Address>({
    firstName: "",
    lastName: "",
    street: "",
    houseNumber: "",
    zipCode: "",
    city: "",
    phoneNumber: "",
    email: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/api/auth/user?fields=userData`, {
          credentials: "include",
        });

        const resData = await response.json();
        if (resData?.data?.userData) setFormData({ ...resData.data.userData });
        if (!response.ok) {
          const error: Error = new Error(`Request failed with status ${response.status}`);
          error.statusCode = response.status;
          throw error;
        }
      } catch (err: any) {
        if (err.statusCode === 401) {
          dispatch(
            UIActions.showWarning({
              flag: "red",
              text: "Nie jesteś zalogowany",
            })
          );
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else
          dispatch(
            UIActions.showWarning({
              flag: "red",
              text: "Błąd połączenia z serwerem",
            })
          );
      }
    })();
  }, [dispatch, navigate]);

  const onSubmitHandler = async function (e: BaseSyntheticEvent) {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_URL}/api/auth/address`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
      }),
    });
    if (response.ok) {
      dispatch(userActions.setAddress({ ...formData }));
      dispatch(
        UIActions.showWarning({
          flag: "green",
          text: "Dane zostały zaaktualizowane",
        })
      );
    }
  };

  return (
    <div className={css.editContainer}>
      <span className={css.title}>Twój adres dostawy </span>
      <form onSubmit={onSubmitHandler} className={css.form}>
        <Input
          id="FirstName-input"
          name="FirstName-input"
          type="text"
          className="input"
          title="Imię:"
          value={formData.firstName}
          onChange={(e: BaseSyntheticEvent) => setFormData({ ...formData, firstName: e.target.value })}
        />
        <Input
          id="LastName-input"
          name="LastName-input"
          type="text"
          className="input"
          title="Nazwisko:"
          value={formData.lastName}
          onChange={(e: BaseSyntheticEvent) => setFormData({ ...formData, lastName: e.target.value })}
        />
        <Input
          id="street-input"
          name="street-input"
          type="text"
          className="input"
          title="Ulica:"
          value={formData.street}
          onChange={(e: BaseSyntheticEvent) => setFormData({ ...formData, street: e.target.value })}
        />
        <Input
          id="hnumb-input"
          name="hnumb-input"
          type="text"
          className="input"
          title="Numer domu:"
          value={formData.houseNumber}
          onChange={(e: BaseSyntheticEvent) => setFormData({ ...formData, houseNumber: e.target.value })}
        />
        <Input
          id="zip-input"
          name="zip-input"
          type="text"
          className="input"
          title="Kod pocztowy:"
          value={formData.zipCode}
          onChange={(e: BaseSyntheticEvent) => setFormData({ ...formData, zipCode: e.target.value })}
        />
        <Input
          id="city-input"
          name="city-input"
          type="text"
          className="input"
          title="Miejscowość:"
          value={formData.city}
          onChange={(e: BaseSyntheticEvent) => setFormData({ ...formData, city: e.target.value })}
        />
        <Input
          id="phone-input"
          name="phone-input"
          type="text"
          className="input"
          title="Numer telefonu:"
          value={formData.phoneNumber}
          onChange={(e: BaseSyntheticEvent) => setFormData({ ...formData, phoneNumber: e.target.value })}
        />
        <Input
          id="email-input"
          name="email-input"
          type="text"
          className="input"
          title="E-mail:"
          value={formData.email}
          onChange={(e: BaseSyntheticEvent) => setFormData({ ...formData, email: e.target.value })}
        />

        <ButtonComponent
          disabled={
            formData.street === "" ||
            formData.city === "" ||
            formData.firstName === "" ||
            formData.houseNumber === "" ||
            formData.lastName === "" ||
            formData.phoneNumber === "" ||
            formData.zipCode === "" ||
            formData.email === ""
          }
        >
          Aktualizuj dane
        </ButtonComponent>
      </form>
    </div>
  );
}

export default EditProfileComponent;
