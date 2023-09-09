import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import css from "./EditProfileComponent.module.scss";
import Input from "../AuthComponents/Input";
import ButtonComponent from "../CommonComponents/ButtonComponent";
import { useDispatch } from "react-redux";
import { UIActions } from "../../store/UI";
function EditProfileComponent() {
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
        const response = await (
          await fetch(
            `http://localhost:9000/api/auth/getuser?fields=userData`,
            {
              credentials: "include",
            }
          )
        ).json();
        if (response.data.userData) setFormData(response.data.userData);
      } catch (err) {
        dispatch(
          UIActions.showWarning({
            flag: "red",
            text: "Brak połączenia z serwerem",
          })
        );
      }
    })();
  }, []);

  const onSubmitHandler = async function (e: BaseSyntheticEvent) {
    e.preventDefault();
    console.log(
      JSON.stringify({
        userData: { ...formData },
      })
    );
    const response = await fetch(
      "http://localhost:9000/api/auth/updateaddress",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      }
    );
    if (response.ok) {
      dispatch(
        UIActions.showWarning({
          flag: "green",
          text: "Dane zostały zaaktualizowane",
        })
      );
    }
    console.log(response);
  };

  return (
    <div className={css.editContainer}>
      <span className={css.title}>Twój adres dostawy </span>
      <form onSubmit={onSubmitHandler} className={css.loginForm}>
        <Input
          id="FirstName-input"
          type="text"
          className="input"
          title="Imię:"
          value={formData.firstName}
          // valid={}
          // touched={}
          // onBlur={}
          onChange={(e: BaseSyntheticEvent) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />
        <Input
          id="LastName-input"
          type="text"
          className="input"
          title="Nazwisko:"
          value={formData.lastName}
          // valid={}
          // touched={}
          // onBlur={}
          onChange={(e: BaseSyntheticEvent) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />
        <Input
          id="street-input"
          type="text"
          className="input"
          title="Ulica:"
          value={formData.street}
          // valid={}
          // touched={}
          // onBlur={}
          onChange={(e: BaseSyntheticEvent) =>
            setFormData({ ...formData, street: e.target.value })
          }
        />
        <Input
          id="hnumb-input"
          type="text"
          className="input"
          title="Numer domu:"
          value={formData.houseNumber}
          // valid={}
          // touched={}
          // onBlur={}
          onChange={(e: BaseSyntheticEvent) =>
            setFormData({ ...formData, houseNumber: e.target.value })
          }
        />
        <Input
          id="zip-input"
          type="text"
          className="input"
          title="Kod pocztowy:"
          value={formData.zipCode}
          // valid={}
          // touched={}
          // onBlur={}
          onChange={(e: BaseSyntheticEvent) =>
            setFormData({ ...formData, zipCode: e.target.value })
          }
        />
        <Input
          id="city-input"
          type="text"
          className="input"
          title="Miejscowość:"
          value={formData.city}
          // valid={}
          // touched={}
          // onBlur={}
          onChange={(e: BaseSyntheticEvent) =>
            setFormData({ ...formData, city: e.target.value })
          }
        />
        <Input
          id="phone-input"
          type="text"
          className="input"
          title="Numer telefonu:"
          value={formData.phoneNumber}
          // valid={}
          // touched={}
          // onBlur={}
          onChange={(e: BaseSyntheticEvent) =>
            setFormData({ ...formData, phoneNumber: e.target.value })
          }
        />
        <ButtonComponent
        // disabled={!(enteredPasswordIsValid && enteredPasswordConfirmIsValid)}
        // spinner={spinner}
        >
          Aktualizuj dane
        </ButtonComponent>
      </form>
    </div>
  );
}

export default EditProfileComponent;
