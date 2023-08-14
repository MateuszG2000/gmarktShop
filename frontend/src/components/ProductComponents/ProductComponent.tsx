import React from "react";
import css from "./ProductComponent.module.scss";
import monitor from "../../Photos/i-xiaomi-mi-curved-gaming-34-bhr4269gl.jpg.webp";
import QuantityComponent from "../CommonComponents/QuantityComponent";
import ButtonComponent from "../CommonComponents/ButtonComponent";
import { LiaCartArrowDownSolid } from "react-icons/lia";

function ProductComponent() {
  function addToCartHandler() {
    console.log("Dodaje do koszyka");
  }
  return (
    <>
      <div className={css.product}>
        <div className={css.productContainer}>
          <img className={css.productImage} src={monitor} alt="abc" />
          <div className={css.productOption}>
            <p className={css.title}>Xiaomi Mi Curved Gaming s</p>
            <div className={css.price}>1699,00 zł</div>
            <div className={css.priceButtonContainer}>
              <div className={css.quantity}>
                <QuantityComponent quantityProp={1} onChange={() => {}} />
              </div>
              <div>
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
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            voluptatum, sapiente necessitatibus, illo labore suscipit facere
            asperiores, commodi consequuntur vel explicabo culpa fugit dolore
            ad. Odit quas consequuntur ex nulla!
          </p>
        </div>
      </div>
    </>
  );
}

export default ProductComponent;
