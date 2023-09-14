import React, { useEffect, useState } from "react";
import css from "./AddProductComponent.module.scss";
import { AiTwotoneDelete } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../store/appHooks";
import NotAuthComponent from "../CommonComponents/NotAuthComponent";
import { UIActions } from "../../store/UI";
import SpinnerComponent from "../CommonComponents/SpinnerComponent";
function AddProductComponent() {
  const user = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Product[]>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:9000/api/product", {
          credentials: "include",
        });
        const resData = await response.json();
        setData(resData.data);
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

  const deleteHandler = (id: string) => {
    dispatch(
      UIActions.showWarning({
        flag: "red",
        text: "Ta funkcja nie jest zaimplementowana",
      })
    );
  };

  if (!user.loggedIn) return <NotAuthComponent />;
  return (
    <div className={css.addProductContainer}>
      <SpinnerComponent size={48} loading={loading} />
      <div className={css.title}>Aktualne produkty w sklepie: </div>
      {data?.map((product, index) => (
        <React.Fragment key={index}>
          <img
            className={css.img}
            src={`http://localhost:9000/api/images/${product.image}`}
            alt={product.name}
          />
          <div className={css.name}>{product.name}</div>
          <div className={css.right}>{product.price.toFixed(2)} zł</div>
          <div className={css.right}>
            <button
              onClick={() => deleteHandler(product?._id)}
              className={`${css.btn}`}
            >
              <AiTwotoneDelete />
            </button>
          </div>
        </React.Fragment>
      ))}
      <div className={css.title}>Dodaj produkt:</div>
      <div style={{ color: "red" }} className={css.title}>
        Brak możliwości dodania produktu
      </div>
    </div>
  );
}

export default AddProductComponent;
