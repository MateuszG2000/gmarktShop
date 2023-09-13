import { createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  email: "",
  name: "",
  userId: "",
  exp: 0,
  loggedIn: false,
  type: "user",
  addressState: false,
  address: {
    firstName: "",
    lastName: "",
    street: "",
    houseNumber: "",
    zipCode: "",
    city: "",
    phoneNumber: "",
    email: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setAddress(state, action) {
      state.address = action.payload.address;
      state.addressState = action.payload.addressState;
    },
    logIn(state, action) {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.exp = action.payload.exp;
      state.name = action.payload.name;
      state.type = action.payload.type;
      state.address = action.payload.address;
      state.loggedIn = true;
    },
    logOut() {
      return initialState;
    },
    isAuth() {},
  },
});
export const userActions = userSlice.actions;
export default userSlice;
