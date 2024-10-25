import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { iGood } from "../../lib/definitions";

interface CartState {
  goods: Set<iGood>;
}

// Define the initial state using that type
const initialState: CartState = {
  goods: new Set(),
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  selectors: {
    selectGoods: (state) => state.goods,
  },
  reducers: {
    addGood: (state, action: PayloadAction<iGood>) => {
      if (state.goods.has(action.payload)) {
        state.goods.add(action.payload);
      }
      state.goods.add(action.payload);
    },
  },
});

export const { selectGoods } = CartSlice.selectors;
export const { addGood } = CartSlice.actions;
