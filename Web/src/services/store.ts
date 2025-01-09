import { configureStore } from "@reduxjs/toolkit";
import { CartSlice } from "../components/cart/cart-slice";
import { CounterSlice } from "../components/counter/counter.slice";
import { OrderErrorsSlice } from "../components/order/order-errors.slice";
import { ShippingSlice } from "../components/shippings/ship.slice";
import { AuthSlice } from "../components/popups/auth/model/auth.slice";
import { HomeSlice } from "../components/home/model/home-slice";

export const store = configureStore({
  reducer: {
    [HomeSlice.name]: HomeSlice.reducer,
    [CartSlice.name]: CartSlice.reducer,
    [CounterSlice.name]: CounterSlice.reducer,
    [OrderErrorsSlice.name]: OrderErrorsSlice.reducer,
    [ShippingSlice.name]: ShippingSlice.reducer,
    [AuthSlice.name]: AuthSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
