import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState: UserState = {
  email: "",
  name: "",
  userId: "",
  exp: 0,
  loggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logIn(state, action) {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.exp = action.payload.exp;
      state.name = action.payload.name;
      state.loggedIn = true;
    },
    logOut() {
      return initialState;
    },
  },
});
export const userActions = userSlice.actions;
export default userSlice;
