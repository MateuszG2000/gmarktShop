import React, { ChangeEvent, useEffect, useState } from "react";
import css from "./DeliveryDataComponent.module.scss";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../store/appHooks";
import { cartActions } from "../../store/cart";
function DeliveryDataComponent() {
  const AddressData: Address[] = [
    {
      id: 1,
      name: "Mateusz",
      lastName: "G",
      street: "Akacjowa",
      houseNumber: "18",
      code: "85-489",
      city: "Łaziska",
      tel: "731912912",
      email: "abc@wp.pl",
    },
    {
      id: 2,
      name: "Zbigniew",
      lastName: "S",
      street: "Kasztanowa ",
      houseNumber: "12",
      code: "85-123",
      city: "Opole",
      tel: "123123123",
      email: "bca@onet.pl",
    },
  ];
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [initialAddressSet, setInitialAddressSet] = useState(false);
  const [address, setAddress] = useState<Address>(AddressData[0]);

  useEffect(() => {
    if (initialAddressSet || address === AddressData[0]) {
      dispatch(cartActions.setAddress({ address }));
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
                  <p>
                    ul. {data.street} {data.houseNumber}
                  </p>
                  <p>
                    {data.code} {data.city}
                  </p>
                </div>
                <div className={css.contact}>
                  {" "}
                  <p>tel. {data.tel}</p>
                  <p>e-mail: {data.email}</p>
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
