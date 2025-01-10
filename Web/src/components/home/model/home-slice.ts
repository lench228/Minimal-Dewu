import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { iGood } from "../../../lib/definitions";
import { TPending } from "../../../services/types";
import { getGoodThunk } from "./actions";

interface HomeState extends TPending {
  url: string;
  activePopup: string;
  isPopupOpen: boolean;
  good?: iGood;
}

const initialState: HomeState = {
  url: "",
  error: "",
  isLoading: false,
  activePopup: "",
  isPopupOpen: false,
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
      const regex2 = "https://dw4.co/";
      const url = action.payload;
      if (!url || url.startsWith(regex) || url.startsWith(regex2)) {
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

  extraReducers: (builder) => {
    builder.addCase(getGoodThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getGoodThunk.fulfilled, (state, action) => {
      state.good = action.payload.response;
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(getGoodThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.code;
    });
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
