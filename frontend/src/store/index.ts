import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createBlacklistFilter } from "redux-persist-transform-filter";

const saveSubsetFilter = createBlacklistFilter("cart", [
  "totalPrice",
  "totalQuantity",
]);
const persistConfig = {
  key: "root",
  storage: storage,
  transforms: [saveSubsetFilter],
};

const rootReducer = combineReducers({ cart: cartSlice.reducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
export default store;
