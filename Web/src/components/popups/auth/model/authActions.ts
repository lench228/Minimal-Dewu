import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser, TUserData } from "../../../../lib/api/api";

export const registerUserThunk = createAsyncThunk(
  "user/registerUser",
  async (data: TUserData) => registerUser(data),
);

export const loginUserThunk = createAsyncThunk(
  "user/loginUser",
  async (data: TUserData) => loginUser(data),
);
