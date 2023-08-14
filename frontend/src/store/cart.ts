import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
  } as ItemState,
  reducers: {
    addItem(state, action: PayloadAction<Product>) {
      const newItem = action.payload;
      const inCart = state.items.find((item) => item._id === newItem._id);
      if (!inCart) {
        state.items.push({
          _id: newItem._id,
          name: newItem.name,
          image: newItem.image,
          inStock: newItem.inStock,
          quantity: 1,
          price: newItem.price,
        });
      } else {
        inCart.quantity++;
      }
    },
    updateQuantity(state, action) {
      const newItemId = action.payload.id;
      const newQuantity = action.payload.quantity;
      const inCart = state.items.find((item) => item._id === newItemId);
      if (inCart) {
        inCart.quantity = newQuantity;
      } else {
        console.log("something goes wrong");
      }
    },
  },
});
export const cartActions = cartSlice.actions;

export default cartSlice;
