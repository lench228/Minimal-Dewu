import { iShipping, iShippingApi } from "../../lib/definitions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ShippingTypes = "current" | "ended" | "canceled";

interface ShippingState {
  canceled: iShipping[];
  ended: iShipping[];
  current: iShipping[];
  active: ShippingTypes;
}

const initialState: ShippingState = {
  canceled: [],
  ended: [],
  current: [],
  active: "current",
};

export const ShippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    setShipping: (state, action: PayloadAction<iShippingApi>) => {
      state.canceled = action.payload.canceled;
      state.ended = action.payload.ended;
      state.current = action.payload.current;
    },
    setActive: (state, action: PayloadAction<ShippingTypes>) => {
      state.active = action.payload;
    },
  },
});

export const selectEnded = (state: { shipping: ShippingState }) =>
  state.shipping.ended;
export const selectCurrent = (state: { shipping: ShippingState }) =>
  state.shipping.current;
export const selectCanceled = (state: { shipping: ShippingState }) =>
  state.shipping.canceled;
export const selectActive = (state: { shipping: ShippingState }) =>
  state.shipping.active;

export const selectShippingByActiveType = (state: {
  shipping: ShippingState;
}) => state.shipping[state.shipping.active];
export const selectAllShipping = (state: { shipping: ShippingState }) => ({
  current: state.shipping.current,
  ended: state.shipping.ended,
  canceled: state.shipping.canceled,
});

export const { setShipping, setActive } = ShippingSlice.actions;

export default ShippingSlice.reducer;
