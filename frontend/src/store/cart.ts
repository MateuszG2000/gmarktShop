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
        state.items.push(newItem);
        console.log(state.items);
      } else {
        console.log(state.items);
      }
    },
  },
});
export const cartActions = cartSlice.actions;

export default cartSlice;
