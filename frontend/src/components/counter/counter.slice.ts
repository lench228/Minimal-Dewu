import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartSlice } from "../cart/cart-slice";
import { RootState } from "../../store";

interface Counter {
  id: string;
  count: number;
}

interface CartState {
  counters: Counter[];
}

const initialState: CartState = {
  counters: [],
};

export const CounterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addCounter: (state, action: PayloadAction<string>) => {
      state.counters.push({ id: action.payload, count: 1 });
    },
    add: (state, action: PayloadAction<string>) => {
      const counter = state.counters.find((c) => c.id === action.payload);
      if (counter) {
        counter.count += 1;
      }
    },
    sub: (state, action: PayloadAction<string>) => {
      const counter = state.counters.find((c) => c.id === action.payload);
      if (counter && counter.count > 1) {
        counter.count -= 1;
      }
    },
  },
});

export const selectCounters = (state: RootState) => state.counter.counters;

export const selectCounterById = (id: string) =>
  createSelector(selectCounters, (counters) =>
    counters.find((counter) => counter.id === id),
  );

export const { addCounter, add, sub } = CounterSlice.actions;
