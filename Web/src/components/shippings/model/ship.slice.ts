import { iShipping, TShippingApi } from "../../../lib/definitions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TPending } from "../../../services/types";

import { getOrdersThunk, postOrderThunk } from "./actions";

export type ShippingTypes = "current" | "ended" | "canceled";

interface ShippingState extends TPending {
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
  error: "",
  isLoading: false,
};

export const ShippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    setShipping: (state, action: PayloadAction<TShippingApi>) => {
      state.canceled = action.payload.canceled;
      state.ended = action.payload.ended;
      state.current = action.payload.current;
    },
    setActive: (state, action: PayloadAction<ShippingTypes>) => {
      state.active = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrdersThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getOrdersThunk.fulfilled, (state, action) => {
      if (action.payload.response) {
        state.canceled = action.payload.response.canceled;
        state.canceled.map((item) => {
          if (item.goods)
            return item.goods.map((good) => {
              return (good.good.priceRu = good.good.price * 13 * good.count);
            });
        });
        state.ended = action.payload.response.ended;
        state.current = action.payload.response.current;
        state.current.map((item) => {
          if (item.goods)
            return item.goods.map((good) => {
              good.good.properties.map((value) => {
                if (value.name === "颜色") {
                  value.name = "Цвет";
                }
                if (value.name === "尺码") {
                  value.name = "Размер";
                }
              });
              return (good.good.priceRu = good.good.price * 13 * good.count);
            });
        });

        state.current.map((item) => {
          item.total = item.total * 13;
        });
      }
      state.isLoading = false;
    });
    builder.addCase(getOrdersThunk.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(postOrderThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(postOrderThunk.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(postOrderThunk.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const selectEnded = (state: { shipping: ShippingState }) =>
  state.shipping.ended;
export const selectCurrent = (state: { shipping: ShippingState }) =>
  state.shipping.current;
export const selectCanceled = (state: { shipping: ShippingState }) =>
  state.shipping.canceled;

export const selectShippingByActiveType = (state: {
  shipping: ShippingState;
}) => state.shipping[state.shipping.active];

export const { setShipping, setActive } = ShippingSlice.actions;
