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
      state.totalQuantity++;
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
        state.totalQuantity += newQuantity - inCart.quantity;
        inCart.quantity = newQuantity;
        console.log(inCart.quantity);
        console.log(newQuantity - inCart.quantity);
      } else {
        console.log("something went wrong");
      }
    },
    removeItem(state, action) {
      const ItemToDeleteId = action.payload.id;
      const indexToDelete = state.items.findIndex(
        (item) => item._id === ItemToDeleteId
      );
      if (indexToDelete !== -1) {
        state.totalQuantity -= state.items[indexToDelete].quantity;
        state.items.splice(indexToDelete, 1);
      } else console.log("something went wrong");
    },
  },
});
export const cartActions = cartSlice.actions;

export default cartSlice;
