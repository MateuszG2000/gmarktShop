import React from "react";
import css from "./ProductListComponent.module.scss";
import monitor from "../../Photos/i-xiaomi-mi-curved-gaming-34-bhr4269gl.jpg.webp";
import AmountComponent from "../CommonComponents/AmountComponent";
import { BsFillTrash3Fill } from "react-icons/bs";
function ProductListComponent({ moreData }: { moreData: boolean }) {
  return (
    <div className={css.productListComponent}>
      <img className={css.image} src={monitor} alt="prod"></img>
      <span className={css.title}>Title of the product in cart</span>
      {moreData && <span>200,00 zł</span>}
      {moreData && <AmountComponent />}
      <span>200,00 zł</span>
      {moreData && (
        <span className={css.trash}>
          <BsFillTrash3Fill />
        </span>
      )}
    </div>
  );
}

export default ProductListComponent;
