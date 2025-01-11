import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrders, postOrder, TOrderRequest } from "../../../lib/api/api";

export const postOrderThunk = createAsyncThunk(
  "ship/postOrder",
  async (data: TOrderRequest) => {
    await postOrder(data);
  },
);

export const getOrdersThunk = createAsyncThunk("ship/getOrder", async () => {
  const response = await getOrders();
  return response;
});
