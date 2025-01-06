import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../services/store";

interface Counter {
  id: number;
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
    addCounter: (state, action: PayloadAction<number>) => {
      const findCounter = state.counters.find(
        (counter) => counter.id === action.payload,
      );
      if (!findCounter) {
        state.counters.push({ id: action.payload, count: 1 });
      } else {
        findCounter.count += 1;
      }
    },
    add: (state, action: PayloadAction<number>) => {
      const counter = state.counters.find((c) => c.id === action.payload);
      if (counter) {
        counter.count += 1;
      }
    },
    sub: (state, action: PayloadAction<number>) => {
      const counter = state.counters.find((c) => c.id === action.payload);
      if (counter && counter.count > 1) {
        counter.count -= 1;
      }
    },
  },
});

export const selectCounters = (state: RootState) => state.counter.counters;

export const selectCounterById = (id: number) =>
  createSelector(selectCounters, (counters) =>
    counters.find((counter: Counter) => counter.id === id),
  );

export const { addCounter, add, sub } = CounterSlice.actions;
