import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  warning: {
    flag: "green",
    visible: false,
    text: "Komunikat",
  },
  headerExtendedInfo: {
    windowVisible: false,
    cartInfoVisible: false,
    accountInfoVisible: false,
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
    toggleWindow(state) {
      state.headerExtendedInfo.windowVisible =
        !state.headerExtendedInfo.windowVisible;
    },
    hideWindow(state) {
      return {
        ...state,
        headerExtendedInfo: initialState.headerExtendedInfo,
      };
    },
    toggleAccountExtendedInfo(state) {
      if (
        state.headerExtendedInfo.windowVisible &&
        state.headerExtendedInfo.cartInfoVisible
      ) {
        state.headerExtendedInfo.cartInfoVisible = false;
      } else {
        UISlice.caseReducers.toggleWindow(state);
      }
      state.headerExtendedInfo.accountInfoVisible =
        !state.headerExtendedInfo.accountInfoVisible;
    },
    toggleCartExtendedInfo(state) {
      if (
        state.headerExtendedInfo.windowVisible &&
        state.headerExtendedInfo.accountInfoVisible
      ) {
        state.headerExtendedInfo.accountInfoVisible = false;
      } else {
        UISlice.caseReducers.toggleWindow(state);
      }
      state.headerExtendedInfo.cartInfoVisible =
        !state.headerExtendedInfo.cartInfoVisible;
    },
  },
});
export const UIActions = UISlice.actions;
export default UISlice;
