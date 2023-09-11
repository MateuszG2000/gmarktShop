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
  searchVisible: false,
};

const UISlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    toggleSearch(state, action) {
      state.searchVisible = action.payload;
      console.log(action.payload);
    },
    showWarning(state, action) {
      const { flag, text } = action.payload;
      state.warning = { visible: true, flag, text };
    },
    hideWarning(state) {
      state.warning.visible = false;
    },
    toggleWindow(state) {
      state.headerExtendedInfo.windowVisible =
        !state.headerExtendedInfo.windowVisible;
    },
    hideWindow(state) {
      state.headerExtendedInfo = initialState.headerExtendedInfo;
    },
    toggleAccountExtendedInfo(state) {
      const { windowVisible, cartInfoVisible, accountInfoVisible } =
        state.headerExtendedInfo;

      if (windowVisible && cartInfoVisible) {
        state.headerExtendedInfo.cartInfoVisible = false;
      } else {
        UISlice.caseReducers.toggleWindow(state);
      }

      state.headerExtendedInfo.accountInfoVisible = !accountInfoVisible;
    },
    toggleCartExtendedInfo(state) {
      const { windowVisible, accountInfoVisible, cartInfoVisible } =
        state.headerExtendedInfo;

      if (windowVisible && accountInfoVisible) {
        state.headerExtendedInfo.accountInfoVisible = false;
      } else {
        UISlice.caseReducers.toggleWindow(state);
      }

      state.headerExtendedInfo.cartInfoVisible = !cartInfoVisible;
    },
  },
});

export const UIActions = UISlice.actions;
export default UISlice;
