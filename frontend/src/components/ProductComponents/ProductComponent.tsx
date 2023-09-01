import React, { useEffect, useState } from "react";
import css from "./ProductComponent.module.scss";
import monitor from "../../Photos/i-xiaomi-mi-curved-gaming-34-bhr4269gl.jpg.webp";
import QuantityComponent from "../CommonComponents/QuantityComponent";
import ButtonComponent from "../CommonComponents/ButtonComponent";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store/appHooks";
import { Root } from "react-dom/client";

function ProductComponent() {
  const [product, setProduct] = useState<Product | null>(null);
  const { productId } = useParams();
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:9000/api/product/?_id=${productId}`
        );
        const resData = await response.json();
        setProduct(resData.data[0]);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [productId]);
  console.log(product);
  function addToCartHandler() {
    console.log("Dodaje do koszyka");
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
                  quantityProp={1}
                  onChange={() => {}}
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
