import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart";
import { persistReducer, persistStore } from "redux-persist";
import { CookieStorage } from "redux-persist-cookie-storage";
import { createBlacklistFilter } from "redux-persist-transform-filter";
import userSlice from "./user";
import UISlice from "./UI";
import isAuth from "./isAuth";
import Cookies from "cookies-js";

const saveSubsetFilter = createBlacklistFilter("cart", ["totalPrice", "totalQuantity"]);
const persistConfig = {
  key: "root",
  storage: new CookieStorage(Cookies),
  transforms: [saveSubsetFilter],
  blacklist: ["UI"],
};

const rootReducer = combineReducers({
  cart: cartSlice.reducer,
  user: userSlice.reducer,
  UI: UISlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(isAuth),
});
export const persistor = persistStore(store);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
