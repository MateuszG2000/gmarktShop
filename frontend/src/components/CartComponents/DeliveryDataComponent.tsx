import React, { useEffect, useState } from "react";
import css from "./DeliveryDataComponent.module.scss";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/appHooks";
import { UIActions } from "../../store/UI";
function DeliveryDataComponent() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const addressState = useAppSelector(
    (state: RootState) => state.user.addressState
  );
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
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:9000/api/auth/getuser?fields=userData`,
          {
            credentials: "include",
          }
        );

        const resData = await response.json();
        if (!addressState) {
          setError(true);
        } else if (resData?.data?.userData) {
          setError(false);
          setFormData({ ...resData.data.userData });
        }
        if (!response.ok) {
          const error: Error = new Error(
            `Request failed with status ${response.status}`
          );
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
  }, [dispatch, navigate, addressState]);
  if (error) {
    return (
      <div className={css.deliveryData}>
        <span
          style={{
            color: "red",
            fontSize: "1.2rem",
            marginTop: "2rem",
            marginLeft: "2rem",
          }}
        >
          Uzupełnij dane adresowe
        </span>
      </div>
    );
  }
  return (
    <div className={css.deliveryData}>
      <p className={css.title}>Adres dostawy:</p>
      <div className={css.address}>
        {" "}
        <p>
          {formData.firstName} {formData.lastName}
        </p>
        <p>
          ul. {formData.street} {formData.houseNumber}
        </p>
        <p>
          {formData.zipCode} {formData.city}
        </p>
      </div>
      <br></br>
      <div className={css.contact}>
        {" "}
        <p>tel. {formData.phoneNumber}</p>
        <p>e-mail: {formData.email}</p>
      </div>
    </div>
  );
}

export default DeliveryDataComponent;
<form className={css.deliveryMethodContainer}></form>;
