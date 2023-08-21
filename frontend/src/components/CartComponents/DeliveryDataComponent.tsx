import React, { ChangeEvent, useState } from "react";
import css from "./DeliveryDataComponent.module.scss";
function DeliveryDataComponent() {
  const AddressData = [
    {
      id: 1,
      name: "Mateusz",
      LastName: "G",
      street: "Akacjowa 18",
      code: "85-489",
      city: "Łaziska",
      tel: "731912912",
      mail: "abc@wp.pl",
    },
    {
      id: 2,
      name: "Jacek",
      LastName: "S",
      street: "Kasztanowa 12",
      code: "85-123",
      city: "Opole",
      tel: "123123123",
      mail: "bca@onet.pl",
    },
  ];
  const [Address, setAddress] = useState(0);
  const clickHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(Number(event.target.id));
  };
  return (
    <div className={css.deliveryData}>
      <p className={css.title}>Adres dostawy:</p>
      {AddressData.map((data, index) => {
        return (
          <React.Fragment key={data.id}>
            <label htmlFor={`${index}`}>
              <div className={css.label}>
                <input
                  type="radio"
                  name="adress"
                  id={`${index}`}
                  checked={Address === index}
                  onChange={clickHandler}
                ></input>
                <div className={css.address}>
                  {" "}
                  <p>
                    {data.name} {data.LastName}
                  </p>
                  <p>ul. {data.street}</p>
                  <p>
                    {data.code} {data.city}
                  </p>
                </div>
                <div className={css.contact}>
                  {" "}
                  <p>tel. {data.tel}</p>
                  <p>e-mail: {data.mail}</p>
                </div>
              </div>
            </label>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default DeliveryDataComponent;
<form className={css.deliveryMethodContainer}></form>;
