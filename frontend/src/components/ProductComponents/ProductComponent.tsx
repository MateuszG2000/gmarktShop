import React, { useEffect, useState } from "react";
import css from "./ProductComponent.module.scss";
import QuantityComponent from "../CommonComponents/QuantityComponent";
import ButtonComponent from "../CommonComponents/ButtonComponent";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../store/appHooks";
import { UIActions } from "../../store/UI";
import { cartActions } from "../../store/cart";

function ProductComponent() {
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:9000/api/product/?_id=${productId}`
        );
        const resData = await response.json();
        setProduct(resData.data[0]);
      } catch (err) {
        dispatch(
          UIActions.showWarning({
            flag: "red",
            text: "Brak połączenia z serwerem",
          })
        );
      }
    })();
  }, [productId, dispatch]);
  function addToCartHandler() {
    if (product) {
      product.quantity = quantity;
      dispatch(cartActions.addItem(product));
    }
  }
  return (
    <>
      <div className={css.product}>
        <div className={css.productContainer}>
          <img
            className={css.productImage}
            src={`http://localhost:9000/api/images/${product?.image}`}
            alt={product?.name ?? "Zdjecie produktu"}
          />
          <div className={css.productOption}>
            <p className={css.title}>{product?.name}</p>
            <div className={css.price}>{product?.price.toFixed(2)} zł</div>
            <div className={css.priceButtonContainer}>
              <div className={css.quantity}>
                <QuantityComponent
                  quantityProp={quantity}
                  onChange={setQuantity}
                  onRemove={() => {}}
                />
              </div>
              <div className={css.btnContainer}>
                <ButtonComponent disabled={false} onClick={addToCartHandler}>
                  <span className={css.btnIcon}>
                    <LiaCartArrowDownSolid />
                  </span>
                  <span className={css.btnTitle}>Dodaj do koszyka</span>
                </ButtonComponent>
              </div>
            </div>
          </div>
        </div>
        <div className={css.description}>
          <p className={css.descriptionTitle}>Opis</p>
          <p>{product?.description}</p>
        </div>
      </div>
    </>
  );
}

export default ProductComponent;
