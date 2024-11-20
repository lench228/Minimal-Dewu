import { configureStore } from "@reduxjs/toolkit";
import { HomeSlice } from "./components/home/home-slice";
import { CartSlice } from "./components/cart/cart-slice";
import { CounterSlice } from "./components/counter/counter.slice";
import { OrderErrorsSlice } from "./components/order/order-errors.slice";

export const store = configureStore({
  reducer: {
    [HomeSlice.name]: HomeSlice.reducer,
    [CartSlice.name]: CartSlice.reducer,
    [CounterSlice.name]: CounterSlice.reducer,
    [OrderErrorsSlice.name]: OrderErrorsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
