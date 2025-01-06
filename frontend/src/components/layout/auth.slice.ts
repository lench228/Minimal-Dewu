import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iAddress, iUser } from "../../lib/definitions";

interface AuthState {
  isAuthenticated: boolean;
  user: iUser | null;
  address: iAddress | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  address: null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  selectors: {
    selectAuth: (store) => store.isAuthenticated,
    selectAddress: (store) => store.address,
    selectUser: (store) => store.user,
  },
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action: PayloadAction<iUser>) => {
      state.user = action.payload;
    },
    setAddress: (state, action: PayloadAction<iAddress>) => {
      state.address = action.payload;
    },
  },
});

export const { selectAuth, selectAddress, selectUser } = AuthSlice.selectors;

export const { setAuth, setUser, setAddress } = AuthSlice.actions;
