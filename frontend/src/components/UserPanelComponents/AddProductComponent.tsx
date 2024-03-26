import React, { BaseSyntheticEvent, ChangeEvent, useState } from "react";
import css from "./AddProductComponent.module.scss";
import { AiTwotoneDelete } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../store/appHooks";
import NotAuthComponent from "../CommonComponents/NotAuthComponent";
import { UIActions } from "../../store/UI";
import SpinnerComponent from "../CommonComponents/SpinnerComponent";
import ErrorComponent from "../AuthComponents/ErrorComponent";
import { useFetch } from "../../utils/useFetch";
import ButtonComponent from "../CommonComponents/ButtonComponent";
import Input from "../AuthComponents/Input";

function AddProductComponent() {
  const [formData, setFormData] = useState<ProductToAdd>({
    name: "",
    description: "",
    inStock: 0,
    price: 0,
    category: "",
    photo: null,
  });
  const dispatch = useAppDispatch();

  const onSubmitHandler = async function (e: BaseSyntheticEvent) {
    e.preventDefault();
    dispatch(
      UIActions.showWarning({
        flag: "yellow",
        text: "Dodaje produkt...",
      })
    );
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("inStock", formData.inStock.toString());
    formDataToSend.append("price", formData.price.toString());
    formDataToSend.append("category", formData.category);
    if (formData.photo !== null) {
      formDataToSend.append("photo", formData.photo);
    }

    const response = await fetch(`${process.env.REACT_APP_URL}/api/product`, {
      method: "POST",
      credentials: "include",

      body: formDataToSend,
    });
    if (response.ok) {
      dispatch(
        UIActions.showWarning({
          flag: "green",
          text: "Produkt został dodany",
        })
      );
    } else {
      dispatch(
        UIActions.showWarning({
          flag: "red",
          text: "Produkt nie został dodany",
        })
      );
    }
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const selectedPhoto = e.target.files[0];
      setFormData({ ...formData, photo: selectedPhoto });
    }
  };
  const user = useAppSelector((state: RootState) => state.user);
  const deleteHandler = async (productId: string) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/api/product/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        dispatch(
          UIActions.showWarning({
            flag: "green",
            text: "Produkt został usunięty",
          })
        );
        window.location.reload();
      } else {
        dispatch(
          UIActions.showWarning({
            flag: "red",
            text: "Nie udało się usunąć produktu",
          })
        );
      }
    } catch (error) {
      console.error("Błąd podczas wysyłania żądania:", error);
      dispatch(
        UIActions.showWarning({
          flag: "red",
          text: "Wystąpił błąd podczas usuwania produktu",
        })
      );
    }
  };

  const { responseData, error } = useFetch<Response>(
    `${process.env.REACT_APP_URL}/api/product/?fields=name,price,_id,image`
  );
  const data: Product[] = responseData?.data;

  if (!user.loggedIn) return <NotAuthComponent />;
  if (error) return <>{error && <ErrorComponent>Błąd serwera</ErrorComponent>}</>;
  return (
    <div className={css.productContainer}>
      <SpinnerComponent size={48} loading={!data} />
      <div className={css.title}>Aktualne produkty w sklepie:</div>

      <div className={css.productsPanel}>
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
              <button aria-label="Dodaj" onClick={() => deleteHandler(product?._id)} className={`${css.btn}`}>
                <AiTwotoneDelete />
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className={css.title}>Dodaj produkt:</div>

      <form onSubmit={onSubmitHandler} className={css.form}>
        <Input
          id="name-input"
          name="name-input"
          type="text"
          className="input"
          title="Nazwa produktu:"
          value={formData.name}
          onChange={(e: BaseSyntheticEvent) => setFormData({ ...formData, name: e.target.value })}
        />
        <Input
          id="description-input"
          name="description-input"
          type="text"
          className="input"
          title="Opis produktu:"
          value={formData.description}
          onChange={(e: BaseSyntheticEvent) => setFormData({ ...formData, description: e.target.value })}
        />
        <label htmlFor="category-input">Kategoria:</label>
        <select
          id="category-input"
          name="category-input"
          className="input"
          value={formData.category}
          onChange={(e: BaseSyntheticEvent) => setFormData({ ...formData, category: e.target.value })}
        >
          <option value="">Wybierz kategorię</option>
          <option value="pcs">Komputery stacjonarne</option>
          <option value="monitors">Monitory</option>
          <option value="laptops">Laptopy</option>
          <option value="headphones">Słuchawki</option>
          <option value="phones">Smartfony</option>
          <option value="accessories">Akcesoria</option>
        </select>
        <Input
          id="photo-input"
          name="photo-input"
          type="file"
          className="input"
          title="Zdjęcie:"
          onChange={handlePhotoChange}
        />

        <Input
          id="inStock-input"
          name="inStock-input"
          type="number"
          className="input"
          title="Ilość w magazynie:"
          value={formData.inStock?.toString()}
          onChange={(e: BaseSyntheticEvent) => setFormData({ ...formData, inStock: e.target.value })}
        />
        <Input
          id="price-input"
          name="price-input"
          type="number"
          className="input"
          title="Cena:"
          value={formData.price?.toString()}
          onChange={(e: BaseSyntheticEvent) => setFormData({ ...formData, price: e.target.value })}
        />

        <ButtonComponent
          disabled={
            formData.name === "" ||
            formData.description === "" ||
            formData.inStock === 0 ||
            formData.price === 0 ||
            formData.category === "" ||
            formData.photo === null
          }
        >
          Dodaj produkt
        </ButtonComponent>
      </form>
    </div>
  );
}

export default AddProductComponent;
