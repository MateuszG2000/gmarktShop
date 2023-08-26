import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  warning: {
    flag: "green",
    visible: false,
    text: "Komunikat",
  },
  accountExtendedInfo: {
    visible: false,
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
    hideWarning(state) {
      state.warning.visible = false;
    },
    toggleAccountExtendedInfo(state) {
      if (state.accountExtendedInfo.visible)
        state.accountExtendedInfo.visible = false;
      else if (!state.accountExtendedInfo.visible)
        state.accountExtendedInfo.visible = true;
    },
  },
});
export const UIActions = UISlice.actions;
export default UISlice;
