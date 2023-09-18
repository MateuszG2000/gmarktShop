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
      state.address = action.payload;
      if (
        action.payload.street === "" ||
        action.payload.city === "" ||
        action.payload.firstName === "" ||
        action.payload.houseNumber === "" ||
        action.payload.lastName === "" ||
        action.payload.phoneNumber === "" ||
        action.payload.zipCode === "" ||
        action.payload.email === "" ||
        Object.entries(action.payload).length === 0
      )
        state.addressState = false;
      else state.addressState = true;
    },
    logIn(state, action) {
      console.log(action.payload);
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.exp = action.payload.exp;
      state.name = action.payload.name;
      state.type = action.payload.type;
      state.loggedIn = true;
      userSlice.caseReducers.setAddress(state, {
        type: "",
        payload: { ...action.payload.address },
      });
    },
    logOut() {
      return initialState;
    },
    isAuth() {},
  },
});
export const userActions = userSlice.actions;
export default userSlice;
