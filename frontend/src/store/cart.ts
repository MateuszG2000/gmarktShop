import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";
const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  shipping: {
    _id: 0,
    name: "------",
    price: "------",
    company: "------",
    cashOnDelivery: false,
  },
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem(state, action: PayloadAction<Product>) {
      let quantity;
      const newItem = action.payload;
      const inCart = state.items.find((item) => item._id === newItem._id);
      if (newItem.quantity) quantity = newItem.quantity;
      else quantity = 1;
      console.log(quantity);
      state.totalQuantity += quantity;

      if (!inCart) {
        state.items.push({
          _id: newItem._id,
          name: newItem.name,
          image: newItem.image,
          inStock: newItem.inStock,
          quantity: quantity,
          price: newItem.price,
        });
      } else {
        inCart.quantity += quantity;
      }
      cartSlice.caseReducers.calcTotalPrice(state);
    },
    updateQuantity(state, action) {
      const newItemId = action.payload.id;
      const newQuantity = action.payload.quantity;
      const inCart = state.items.find((item) => item._id === newItemId);
      if (inCart) {
        state.totalQuantity += newQuantity - inCart.quantity;
        inCart.quantity = newQuantity;
        cartSlice.caseReducers.calcTotalPrice(state);
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
      cartSlice.caseReducers.calcTotalPrice(state);
    },
    calcTotalPrice(state) {
      const price = state.items.reduce((acc, cur) => {
        return acc + cur.price * cur.quantity;
      }, 0);
      state.totalPrice = price;
    },
    setShipping(state, action) {
      const newShipping: IShipping = action.payload;
      state.shipping = newShipping;
    },
    setTotalQuantity(state) {
      const quantity = state.items.reduce((acc, cur) => {
        return acc + cur.quantity;
      }, 0);
      state.totalQuantity = quantity;
    },

    sendData(state) {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state, action: any) => {
      let ret;
      if (action.payload?.cart) {
        cartSlice.caseReducers.setTotalQuantity(action.payload?.cart);
        cartSlice.caseReducers.calcTotalPrice(action.payload?.cart);
        ret = {
          ...action.payload?.cart,
        };
      } else {
        ret = {
          ...initialState,
        };
      }

      return ret;
    });
  },
});
export const cartActions = cartSlice.actions;

export default cartSlice;
