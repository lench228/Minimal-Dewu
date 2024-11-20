import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store";

interface OrderErrorsState {
  errors: { [key: string]: string };
}

const initialState: OrderErrorsState = {
  errors: {},
};

export const OrderErrorsSlice = createSlice({
  name: "orderErrors",
  initialState,
  selectors: {
    selectErrors: (store) => store.errors,
  },
  reducers: {
    findErrors: (state, action: PayloadAction<HTMLInputElement>) => {
      const input = action.payload;
      if (input.name) {
        if (!input.checkValidity()) {
          state.errors[input.name] = input.validationMessage;
        } else {
          delete state.errors[input.name];
        }
      }
    },
  },
});

export const { findErrors } = OrderErrorsSlice.actions;
export const { selectErrors } = OrderErrorsSlice.selectors;
