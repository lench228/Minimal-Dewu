import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import error from "../ui/input/error";
import { iGood } from "../../lib/definitions";

interface HomeState {
  url: string;
  error: string;
  isLoading: boolean;
  activePopup: string;
  isPopupOpen: boolean;
  good: iGood | null;
}

// Define the initial state using that type
const initialState: HomeState = {
  url: "https://www.dewu.com/product-detail.html?sourceName=pc&spuId=10023658&propertyValueId=377025767&skuId=661620314",
  error: "",
  isLoading: false,
  activePopup: "",
  isPopupOpen: false,
  good: null,
};

export const HomeSlice = createSlice({
  name: "home",
  initialState,
  selectors: {
    selectIsLoading: (state) => state.isLoading,
    selectUrl: (state) => state.url,
    selectError: (state) => state.error,
    selectActivePopup: (state) => state.activePopup,
    selectGood: (state) => state.good,
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
    setActivePopup: (state, action: PayloadAction<string>) => {
      state.activePopup = action.payload;
    },
    setGood: (state, action: PayloadAction<iGood>) => {
      state.good = action.payload;
    },
  },
});

export const {
  selectIsLoading,
  selectUrl,
  selectError,
  selectActivePopup,
  selectGood,
} = HomeSlice.selectors;
export const { addUrlAndValidate, setLoading, setActivePopup, setGood } =
  HomeSlice.actions;
