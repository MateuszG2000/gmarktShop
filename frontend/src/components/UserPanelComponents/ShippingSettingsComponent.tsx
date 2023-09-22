import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import css from "./ShippingSettingsComponent.module.scss";
import SpinnerComponent from "../CommonComponents/SpinnerComponent";
import { UIActions } from "../../store/UI";
import { AiFillFileAdd, AiTwotoneDelete } from "react-icons/ai";
import Input from "../AuthComponents/Input";
import { useAppDispatch, useAppSelector } from "../../store/appHooks";
import NotAuthComponent from "../CommonComponents/NotAuthComponent";

function ShippingSettingsComponent() {
  const [data, setData] = useState<IShipping[]>([]);
  const [loading, setLoading] = useState(true);

  const user = useAppSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState<IShipping>({
    name: "",
    company: "",
    price: 0,
    cashOnDelivery: false,
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/api/config?fields=shipping`,
          {
            credentials: "include",
          }
        );
        const resData = await response.json();
        setData(resData.data.shipping);
        setLoading(false);
      } catch (err) {
        dispatch(
          UIActions.showWarning({
            flag: "red",
            text: "Coś poszło nie tak",
          })
        );
      }
    })();
  }, [dispatch]);
  const deleteHandler = async (id: string) => {
    if (!id) {
      dispatch(
        UIActions.showWarning({
          flag: "red",
          text: "Odśwież stronę",
        })
      );
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/config/shipping/${id}`,
        {
          method: "delete",
          credentials: "include",
        }
      );
      if (!response.ok) {
        dispatch(
          UIActions.showWarning({
            flag: "red",
            text: "Rekord nie został usunięty",
          })
        );
      }
      const resData = await response.json();

      setData(resData.data.shipping);
      dispatch(
        UIActions.showWarning({
          flag: "green",
          text: "Rekord został usunięty",
        })
      );
    } catch (err) {
      dispatch(
        UIActions.showWarning({
          flag: "red",
          text: "Coś poszło nie tak",
        })
      );
    }
  };
  const submitHandler = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/config/shipping`,
        {
          method: "put",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
          }),
        }
      );
      setData((data) => [...data, formData]);
      dispatch(
        UIActions.showWarning({
          flag: "green",
          text: "Dodano nowy sposób dostawy",
        })
      );
    } catch (err) {
      dispatch(
        UIActions.showWarning({
          flag: "red",
          text: "Coś poszło nie tak",
        })
      );
    }
  };
  if (!user.loggedIn) return <NotAuthComponent />;
  return (
    <div className={css.settingsContainer}>
      <SpinnerComponent size={48} loading={loading} />
      <div className={css.title}>Aktualne sposoby dostawy</div>
      {data?.map((shippingMethod, index) => (
        <React.Fragment key={index}>
          <div className={css.left}>{shippingMethod.name}</div>
          <div className={css.left}>{shippingMethod.company}</div>
          <div className={css.left}>
            {shippingMethod.cashOnDelivery
              ? "Płatność przy dostawie"
              : "Brak płatności"}
          </div>
          <div className={css.right}>{shippingMethod.price.toFixed(2)} zł</div>
          <div className={css.right}>
            <button
              onClick={() => deleteHandler(shippingMethod?._id)}
              className={`${css.btn}`}
            >
              <AiTwotoneDelete />
            </button>
          </div>
        </React.Fragment>
      ))}
      <div className={css.title}>Dodaj sposób dostawy:</div>

      <form onSubmit={submitHandler} className={css.form}>
        <Input
          id="Name-input"
          name="Name-input"
          type="text"
          className="input"
          value={formData?.name}
          placeholder="Nazwa przesyłki"
          onChange={(e: BaseSyntheticEvent) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />
        <Input
          id="Company-input"
          name="Company-input"
          type="text"
          className="input"
          placeholder="Firma kurierska"
          value={formData?.company}
          onChange={(e: BaseSyntheticEvent) =>
            setFormData({ ...formData, company: e.target.value })
          }
        />
        <select
          className={css.cashOnDelivery}
          onChange={(e: BaseSyntheticEvent) => {
            const value = e.target.value === "true" ? true : false;
            setFormData({ ...formData, cashOnDelivery: value });
          }}
        >
          <option value="true">Płatność przy odbiorze</option>
          <option value="false">Brak płatności</option>
        </select>
        <Input
          id="Price-input"
          name="Price-input"
          type="number"
          step={0.01}
          className="input"
          placeholder="Cena"
          value={String(formData?.price)}
          onChange={(e: BaseSyntheticEvent) =>
            setFormData({ ...formData, price: Number(e.target.value) })
          }
        />
        <button className={`${css.btn} ${css.btnSave}`}>
          <AiFillFileAdd />
        </button>
      </form>
      <SpinnerComponent loading={false} size={48} />
    </div>
  );
}

export default ShippingSettingsComponent;
