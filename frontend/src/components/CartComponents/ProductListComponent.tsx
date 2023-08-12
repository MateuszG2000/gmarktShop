import React, { useState } from "react";
import css from "./ProductListComponent.module.scss";
import monitor from "../../Photos/i-xiaomi-mi-curved-gaming-34-bhr4269gl.jpg.webp";
import AmountComponent from "../CommonComponents/AmountComponent";
import { BsFillTrash3Fill } from "react-icons/bs";
function ProductListComponent({
  moreData,
  product,
}: {
  moreData: boolean;
  product: ICartProduct;
}) {
  const [endPrice, setEndPrice] = useState(+product.price * +product.quantity);
  const img = `http://localhost:9000/api/images/${product.image}`;
  return (
    <div className={css.productListComponent}>
      <img className={css.image} src={img} alt="prod"></img>
      <span className={css.title}>{product.name}</span>
      {moreData && <span>{product.price?.toFixed(2)} zł</span>}
      {moreData && <AmountComponent quantity={product.quantity} />}
      <span>{endPrice.toFixed(2)}</span>
      {moreData && (
        <span className={css.trash}>
          <BsFillTrash3Fill />
        </span>
      )}
    </div>
  );
}

export default ProductListComponent;
