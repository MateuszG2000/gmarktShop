import { Dispatch } from "react";
import { cartActions } from "./cart";
type CartAction = { type: string };

export const sendCartData = (cart: CartState) => {
  return async (dispatch: Dispatch<CartAction>) => {
    console.log(cart);
    const response = await fetch(
      "https://react-http-6b4a6.firebaseio.com/cart.json",
      {
        method: "PUT",
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
        }),
      }
    );
    dispatch(cartActions.sendData({ id: "abc" }));
  };
};
