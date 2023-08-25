import { createSlice } from "@reduxjs/toolkit";

const initialState: UIState = {
  warning: {
    flag: "green",
    visible: false,
    text: "Komunikat",
  },
};

const UISlice = createSlice({
  name: "UI",
  initialState: initialState,
  reducers: {
    showWarning(state, action) {
      state.warning.visible = true;
      state.warning.flag = action.payload.flag;
      state.warning.text = action.payload.text;
    },
    hideWarning() {
      return initialState;
    },
  },
});
export const UIActions = UISlice.actions;
export default UISlice;
