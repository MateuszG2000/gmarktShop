import { Dispatch } from "react";
import { cartActions } from "./cart";
type CartAction = { type: string };

export const sendCartData = (cart: CartState, user: UserState) => {
  return async (dispatch: Dispatch<CartAction>) => {
    const data = {
      orderProducts: cart.items.map((item) => {
        return {
          product: item._id,
          quantity: item.quantity,
          price: item.price,
        };
      }),
      address: cart.address,
      shipping: cart.shipping,
      totalPriceWithoutShipping: cart.totalPrice,
      user: user.userId,
    };
    const response = await (
      await fetch("http://localhost:9000/api/order", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
    ).json();
    dispatch(cartActions.sendData());
  };
};
