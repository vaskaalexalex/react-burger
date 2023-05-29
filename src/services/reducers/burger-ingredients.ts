import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchIngredients } from "../../utils/api";
import { IIngredient } from "../../components/constants";

interface ISliceState {
  ingredients: IIngredient[];
  status: string;
  error: string;
}

export const initialState: ISliceState = {
  ingredients: [],
  status: "idle",
  error: "",
};

export const getIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
    const response = await fetchIngredients();
    return response;
  }
);

export const allIngredients = createSlice({
  name: "allIngredients",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ingredients = state.ingredients.concat(action.payload);
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.status = "failed";
        if (action.error.message) state.error = action.error.message;
      });
  },
});

export default allIngredients.reducer;
