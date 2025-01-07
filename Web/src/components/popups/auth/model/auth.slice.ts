import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iAddress, iUser } from "../../../../lib/definitions";
import { loginUserThunk, registerUserThunk } from "./authActions";
import { TPending } from "../../../../services/types";

interface AuthState extends TPending {
  isAuthenticated: boolean;
  user: iUser | null;
  address: iAddress | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  address: null,
  error: "",
  isLoading: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  selectors: {
    selectAuth: (store) => store.isAuthenticated,
    selectAddress: (store) => store.address,
    selectUser: (store) => store.user,
    selectIsLoading: (store) => store.isLoading,
    selectError: (store) => store.error,
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
  extraReducers: (builder) => {
    builder.addCase(registerUserThunk.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(registerUserThunk.fulfilled, (state) => {
      state.isAuthenticated = true;
      state.error = "";
      state.isLoading = false;
    });
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;

      state.error = action.error.message;
    });

    builder.addCase(loginUserThunk.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(loginUserThunk.fulfilled, (state) => {
      state.isAuthenticated = true;
      state.error = "";
      state.isLoading = false;
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;

      state.error = action.error.message;
    });
  },
});

export const {
  selectAuth,
  selectAddress,
  selectUser,
  selectError,
  selectIsLoading,
} = AuthSlice.selectors;

export const { setAuth, setUser, setAddress } = AuthSlice.actions;
