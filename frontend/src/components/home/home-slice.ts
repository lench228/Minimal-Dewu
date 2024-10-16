import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import error from "../ui/input/error";

interface HomeState {
  url: string;
  error: string;
  loading: boolean;
}

// Define the initial state using that type
const initialState: HomeState = {
  url: "",
  error: "",
  loading: false,
};

export const HomeSlice = createSlice({
  name: "home",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  selectors: {
    selectIsLoading: (state) => state.loading,
    selectUrl: (state) => state.url,
    selectError: (state) => state.error,
  },
  reducers: {
    addUrlAndValidate: (state, action: PayloadAction<string>) => {
      const regex = "https://www.dewu.com/product-detail";
      const url = action.payload;
      if (!url || url.startsWith(regex)) {
        state.error = "";
      } else {
        state.error = "Неверная ссылка";
      }
      state.url = url;
    },
    setLoading: (state) => {
      state.loading = !state.loading;
    },
  },
});

export const { selectIsLoading, selectUrl, selectError } = HomeSlice.selectors;
export const { addUrlAndValidate, setLoading } = HomeSlice.actions;

export default HomeSlice.reducer;
