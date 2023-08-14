import React, { useState } from "react";
import css from "./ProductListComponent.module.scss";
import QuantityComponent from "../CommonComponents/QuantityComponent";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";
const debounce = require("lodash.debounce");
function ProductListComponent({
  moreData,
  product,
}: {
  moreData: boolean;
  product: ICartProduct;
}) {
  const dispatch = useDispatch();

  const [endPrice, setEndPrice] = useState(+product.price * +product.quantity);
  const handleQuantity = debounce((quantity: number) => {
    const endPrice = +product.price * quantity;
    setEndPrice(endPrice);
    dispatch(
      cartActions.updateQuantity({ quantity: quantity, id: product._id })
    );
  }, 400);
  const img = `http://localhost:9000/api/images/${product.image}`;
  return (
    <div className={css.productListComponent}>
      <img className={css.image} src={img} alt="prod"></img>
      <span className={css.title}>{product.name}</span>
      {moreData && <span>{product.price?.toFixed(2)} zł</span>}
      {moreData && (
        <QuantityComponent
          quantityProp={product.quantity}
          onChange={handleQuantity}
        />
      )}
      <span className={css.price}>{endPrice.toFixed(2)} zł</span>
      {moreData && (
        <span className={css.trash}>
          <BsFillTrash3Fill />
        </span>
      )}
    </div>
  );
}

export default ProductListComponent;
