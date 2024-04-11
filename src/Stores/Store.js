import rootReducer from "./root-reducer";
import { configureStore } from "@reduxjs/toolkit";

const Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default Store;
