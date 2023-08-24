import { createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  email: "",
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
      state.loggedIn = true;
    },
  },
});
export const userActions = userSlice.actions;
export default userSlice;
