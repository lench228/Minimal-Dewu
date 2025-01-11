import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iUser } from "../../../../lib/definitions";
import {
  getUserDataThunk,
  loginUserThunk,
  registerUserThunk,
  updateUserDataThunk,
} from "./authActions";
import { TPending } from "../../../../services/types";

interface AuthState extends TPending {
  isAuthenticated: boolean;
  isAuthCheck: boolean;
  user: iUser | null;
  isUserUpdated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isAuthCheck: false,
  error: "",
  isLoading: false,
  isUserUpdated: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  selectors: {
    selectAuth: (store) => store.isAuthenticated,

    selectUser: (store) => store.user,
    selectIsLoading: (store) => store.isLoading,
    selectError: (store) => store.error,
    selectIsAuthChecked: (store) => store.isAuthCheck,
  },
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action: PayloadAction<iUser>) => {
      state.user = action.payload;
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
      window.location.reload();
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
      window.location.reload();
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getUserDataThunk.pending, (state) => {
      state.isLoading = true;
      state.isAuthCheck = false;
      state.error = "";
    });
    builder.addCase(getUserDataThunk.fulfilled, (state, action) => {
      if (action.payload.response) {
        state.user = {
          address: action.payload.response.addressData,
          userInfo: action.payload.response.personalData,
        };
      }
      state.isAuthenticated = true;

      state.isAuthCheck = true;

      state.error = "";
      state.isLoading = false;
    });
    builder.addCase(getUserDataThunk.rejected, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isLoading = false;

      state.error = "Войдите в аккаунт";
      state.isAuthCheck = true;
    });

    builder.addCase(updateUserDataThunk.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(updateUserDataThunk.fulfilled, (state, action) => {
      if (
        action.payload.response &&
        action.payload.response.personalData &&
        action.payload.response.addressData &&
        state.user !== null
      ) {
        state.user = {
          ...state.user,
          userInfo: action.payload.response.personalData,
          address: action.payload.response.addressData,
        };
      }
      state.isAuthenticated = true;

      state.error = "";
      state.isLoading = false;
    });
    builder.addCase(updateUserDataThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const {
  selectAuth,

  selectUser,
  selectError,
  selectIsLoading,
  selectIsAuthChecked,
} = AuthSlice.selectors;

export const { setAuth, setUser } = AuthSlice.actions;
