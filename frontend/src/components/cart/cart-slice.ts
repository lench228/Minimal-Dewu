import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { iCartGood, iGood } from "../../lib/definitions";
import { store } from "../../store";
import { getGood } from "../../lib/actions/getGood";

interface CartState {
  goods: iCartGood[];
  total: number;
}

const initialState: CartState = {
  goods: [],
  total: 0,
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  selectors: {
    selectGoods: (store) => store.goods,
    selectTotal: (store) => store.total,
    selectCount: (store) => {
      let count = 0;
      store.goods.forEach((good) => {
        count += good.count;
      });
      return count;
    },
  },
  reducers: {
    addGood: (state, action: PayloadAction<iCartGood>) => {
      const findGood = state.goods.find(
        (good) => good.id === action.payload.id,
      );
      if (!findGood) {
        state.goods.push(action.payload);
      } else {
        findGood.count += 1;
      }
      state.total += action.payload.priceRU;
    },
    removeSingleGood: (state, action: PayloadAction<number>) => {
      const findGood = state.goods.find((good) => good.id === action.payload);
      if (findGood) {
        findGood.count -= 1;
        state.total -= findGood.priceRU;
      }
    },
    removeAllGood: (state, action: PayloadAction<number>) => {
      const findGood = state.goods.find((good) => good.id === action.payload);
      state.goods = state.goods.filter((good) => good.id !== action.payload);
      if (findGood) {
        state.total -= findGood.count * findGood.priceRU;
      }
    },
  },
});

export const { selectGoods, selectTotal, selectCount } = CartSlice.selectors;
export const { addGood, removeSingleGood, removeAllGood } = CartSlice.actions;
