import { configureStore } from "@reduxjs/toolkit";
import { HomeSlice } from "./components/home/home-slice";

export const store = configureStore({
  reducer: {
    [HomeSlice.name]: HomeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
