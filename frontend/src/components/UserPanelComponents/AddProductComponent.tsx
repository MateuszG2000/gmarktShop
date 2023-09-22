import React from "react";
import css from "./AddProductComponent.module.scss";
import { AiTwotoneDelete } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../store/appHooks";
import NotAuthComponent from "../CommonComponents/NotAuthComponent";
import { UIActions } from "../../store/UI";
import SpinnerComponent from "../CommonComponents/SpinnerComponent";
import ErrorComponent from "../AuthComponents/ErrorComponent";
import { useFetch } from "../../utils/useFetch";
function AddProductComponent() {
  const user = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const deleteHandler = (id: string) => {
    dispatch(
      UIActions.showWarning({
        flag: "red",
        text: "Ta funkcja jest niedostępna",
      })
    );
  };
  const { responseData, error } = useFetch<Response>(
    `${process.env.REACT_APP_URL}/api/product/?fields=name,price,_id,image`
  );
  const data: Product[] = responseData?.data;

  if (!user.loggedIn) return <NotAuthComponent />;
  if (error)
    return <>{error && <ErrorComponent>Błąd serwera</ErrorComponent>}</>;
  return (
    <div className={css.addProductContainer}>
      <SpinnerComponent size={48} loading={!data} />
      <div className={css.title}>Aktualne produkty w sklepie:</div>

      {data?.map((product, index) => (
        <React.Fragment key={index}>
          <img
            className={css.img}
            crossOrigin="anonymous"
            src={`${process.env.REACT_APP_URL}/api/images/${product.image}`}
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
