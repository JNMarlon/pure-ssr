import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./slice";

export const store = configureStore({
  reducer: rootReducer,
});

export type GlobalState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
