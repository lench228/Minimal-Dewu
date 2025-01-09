import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDewu } from "../../../lib/api/api";

export const getGoodThunk = createAsyncThunk(
  "home/getGood",
  async (url: string) => getDewu(url),
);
