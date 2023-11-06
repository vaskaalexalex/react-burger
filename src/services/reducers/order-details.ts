import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { addOrderRequest, getOrder } from "../../utils";
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
    accessToken,
  }: {
    ingredients: IIngredient[];
    bun: IIngredient;
    accessToken: string;
  }) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
      body: JSON.stringify({
        ingredients: [bun._id, ...ingredients.map(({ _id }) => _id)],
      }),
    };

    return await addOrderRequest(requestOptions);
  }
);

export const getOrderByNumber = createAsyncThunk(
  "ingredients/getOrderByNumber",
  async (number: number) => {
    const response = await getOrder(number);
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
      .addCase(createOrder.pending, (state) => {
        state.status = "getOrderNumber/loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "getOrderNumber/succeeded";
        state.orderNumber = action.payload.order.number;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderNumber = 0;
        state.status = "getOrderNumber/failed";
        if (action.error.message) state.error = action.error.message;
      })

      .addCase(getOrderByNumber.pending, (state) => {
        state.status = "getOrderByNumber/loading";
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.status = "getOrderByNumber/succeeded";
        state.orderData = action.payload[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.orderNumber = 0;
        state.status = "getOrderByNumber/failed";
        if (action.error.message) state.error = action.error.message;
      });
  },
});

export const { addDataToModal } = orderDetails.actions;

export default orderDetails.reducer;
