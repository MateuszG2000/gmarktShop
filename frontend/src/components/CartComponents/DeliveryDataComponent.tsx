import React from "react";
import css from "./DeliveryDataComponent.module.scss";
import { useAppSelector } from "../../store/appHooks";
import { useFetch } from "../../utils/useFetch";
function DeliveryDataComponent() {
  const addressState = useAppSelector(
    (state: RootState) => state.user.addressState
  );
  let { responseData, error } = useFetch<Response>(
    "http://localhost:9000/api/auth/getuser?fields=userData",
    {
      credentials: "include",
    }
  );
  if (!addressState) error = new Error("Uzupełnij dane adresowe");
  const data: Address = responseData?.data.userData;
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
          {data?.firstName} {data?.lastName}
        </p>
        <p>
          ul. {data?.street} {data?.houseNumber}
        </p>
        <p>
          {data?.zipCode} {data?.city}
        </p>
      </div>
      <br></br>
      <div className={css.contact}>
        {" "}
        <p>tel. {data?.phoneNumber}</p>
        <p>e-mail: {data?.email}</p>
      </div>
    </div>
  );
}

export default DeliveryDataComponent;
<form className={css.deliveryMethodContainer}></form>;
