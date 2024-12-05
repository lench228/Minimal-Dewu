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
    selectIsValid: (store) => store.errors,
  },
  reducers: {
    findErrors: (
      state,
      action: PayloadAction<{
        name: string;
        isValid: boolean;
        validationMessage: string;
      }>,
    ) => {
      const { name, isValid, validationMessage } = action.payload;
      if (name) {
        if (!isValid) {
          state.errors[name] = validationMessage;
        } else {
          delete state.errors[name];
        }
      }
    },
    resetErrors: (state) => {
      state.errors = {};
    },
  },
});

export const { findErrors, resetErrors } = OrderErrorsSlice.actions;
export const { selectErrors } = OrderErrorsSlice.selectors;
