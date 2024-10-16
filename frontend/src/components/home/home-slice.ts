import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import error from "../ui/input/error";

interface HomeState {
  url: string;
  error: string;
  isLoading: boolean;
  isGoodPopupOpenSelector: boolean;
}

// Define the initial state using that type
const initialState: HomeState = {
  url: "",
  error: "",
  isLoading: false,
  isGoodPopupOpenSelector: false,
};

export const HomeSlice = createSlice({
  name: "home",
  initialState,
  selectors: {
    selectIsLoading: (state) => state.isLoading,
    selectUrl: (state) => state.url,
    selectError: (state) => state.error,
    isGoodPopupOpenSelector: (state) => state.isGoodPopupOpenSelector,
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { selectIsLoading, selectUrl, selectError } = HomeSlice.selectors;
export const { addUrlAndValidate, setLoading } = HomeSlice.actions;
