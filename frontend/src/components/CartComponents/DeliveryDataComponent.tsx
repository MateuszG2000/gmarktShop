import React, { ChangeEvent, useEffect, useState } from "react";
import css from "./DeliveryDataComponent.module.scss";
import { useLocation } from "react-router-dom";
function DeliveryDataComponent({ formHandler }: { formHandler: Function }) {
  const AddressData: Address[] = [
    {
      id: 1,
      name: "Mateusz",
      lastName: "G",
      street: "Akacjowa 18",
      code: "85-489",
      city: "Łaziska",
      tel: "731912912",
      mail: "abc@wp.pl",
    },
    {
      id: 2,
      name: "Zbigniew",
      lastName: "S",
      street: "Kasztanowa 12",
      code: "85-123",
      city: "Opole",
      tel: "123123123",
      mail: "bca@onet.pl",
    },
  ];
  const location = useLocation();
  const [initialAddressSet, setInitialAddressSet] = useState(false);
  const [address, setAddress] = useState<Address>(AddressData[0]);

  useEffect(() => {
    if (initialAddressSet || address === AddressData[0]) {
      formHandler(address);
    }
  }, [location, initialAddressSet]);

  const clickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedAddress = AddressData.find(
      (item) => item.id === Number(event.target.id)
    );
    if (selectedAddress) {
      setAddress(selectedAddress);
      setInitialAddressSet(true);
    }
  };
  return (
    <div className={css.deliveryData}>
      <p className={css.title}>Adres dostawy:</p>
      {AddressData.map((data, index) => {
        return (
          <React.Fragment key={data.id}>
            <label htmlFor={`${index + 1}`}>
              <div className={css.label}>
                <input
                  type="radio"
                  name="adress"
                  id={`${index + 1}`}
                  checked={address.id === index + 1}
                  onChange={clickHandler}
                ></input>
                <div className={css.address}>
                  {" "}
                  <p>
                    {data.name} {data.lastName}
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
