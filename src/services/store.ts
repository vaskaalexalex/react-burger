import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root-reducer";
import { webSocketApi } from "./sockets/web-sockets";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(webSocketApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;

export default store;
