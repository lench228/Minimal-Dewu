import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserData,
  loginUser,
  registerUser,
  TUpdateUserData,
  TUserData,
  updateUserData,
} from "../../../../lib/api/api";

export const registerUserThunk = createAsyncThunk(
  "user/registerUser",
  async (data: TUserData) => await registerUser(data),
);

export const loginUserThunk = createAsyncThunk(
  "user/loginUser",
  async (userData: TUserData) => await loginUser(userData),
);

export const getUserDataThunk = createAsyncThunk(
  "user/getUserData",
  async () => await getUserData(),
);
export const updateUserDataThunk = createAsyncThunk(
  "user/updateUserData",
  async (data: TUpdateUserData) => await updateUserData(data),
);
