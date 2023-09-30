import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

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

export const getOrderNumber = createAsyncThunk(
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

    const response = await addOrderRequest(requestOptions);
    return response;
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
      .addCase(getOrderNumber.pending, (state) => {
        state.status = "getOrderNumber/loading";
      })
      .addCase(
        getOrderNumber.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.status = "getOrderNumber/succeeded";
          state.orderNumber = action.payload;
        }
      )
      .addCase(getOrderNumber.rejected, (state, action) => {
        state.orderNumber = 0;
        state.status = "getOrderNumber/failed";
        if (action.error.message) state.error = action.error.message;
      });
  },
});

export const { addDataToModal } = orderDetails.actions;

export default orderDetails.reducer;
