import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { iGood } from "../../lib/definitions";
import { store } from "../../store";

interface CartState {
  goods: iGood[];
}

const initialState: CartState = {
  goods: [],
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  selectors: {
    selectGoods: (store) => store.goods,
  },
  reducers: {
    addGood: (state, action: PayloadAction<iGood>) => {
      if (!state.goods.some((good) => good.id === action.payload.id)) {
        state.goods.push(action.payload);
      }
    },
    removeGood: (state, action: PayloadAction<number>) => {
      state.goods = state.goods.filter((good) => good.id !== action.payload);
    },
  },
});

export const { selectGoods } = CartSlice.selectors;
export const { addGood, removeGood } = CartSlice.actions;
