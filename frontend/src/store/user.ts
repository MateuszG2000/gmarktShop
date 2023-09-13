import { createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  email: "",
  name: "",
  userId: "",
  exp: 0,
  loggedIn: false,
  type: "user",
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
      state.type = action.payload.type;
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
