import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { addOrderRequest } from "../../utils";
import { IIngredient, IOrder } from "../../types";

interface ISliceState {
  orderNumber: number;
  orderData?: IOrder;
  status: string;
  error: string;
}

export const initialState: ISliceState = {
  orderNumber: 0,
  status: "",
  error: "",
};

export const createOrder = createAsyncThunk(
  "ingredients/getOrderNumber",
  async ({
    ingredients,
    bun,
  }: {
    ingredients: IIngredient[];
    bun: IIngredient;
  }) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      ingredients: [bun._id, ...ingredients.map(({ _id }) => _id)],
    };

    return await addOrderRequest(requestOptions);
  }
);

export const orderDetails = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    addDataToModal: (state, action: PayloadAction<IOrder>) => {
      return { ...state, orderData: action.payload };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "getOrderNumber/loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "getOrderNumber/succeeded";
        state.orderData = action.payload;
        state.orderNumber = action.payload.order.number;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderNumber = 0;
        state.status = "getOrderNumber/failed";
        if (action.error.message) state.error = action.error.message;
      });
  },
});

export default orderDetails.reducer;
