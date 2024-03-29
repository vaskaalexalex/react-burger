import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import missingIcon from "../../assets/images/icon.svg";
import { IIngredient } from "../../types";
import { IngredientType } from "../../components/constants";
interface ISliceState {
  ingredients: IIngredient[];
  bun: IIngredient;
}

interface MoveIngredients {
  hoverIndex: number;
  dragIndex: number;
}

export const initialState: ISliceState = {
  ingredients: [],
  bun: {
    id: "",
    _id: "",
    name: "Нет булки",
    type: IngredientType.bun,
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: missingIcon,
    image_mobile: "",
    image_large: "",
    __v: 0,
    uniqueId: "",
  },
};

export function arraymove(
  ingredients: IIngredient[],
  fromIndex: number,
  toIndex: number
) {
  let element = ingredients[fromIndex];
  ingredients.splice(fromIndex, 1);
  ingredients.splice(toIndex, 0, element);
}

export const constructorIngredients = createSlice({
  name: "constructorIngredients",
  initialState,
  reducers: {
    addIngredient: (
      state: ISliceState,
      action: PayloadAction<{ ingredient: IIngredient; uniqueId: string }>
    ) => {
      state.ingredients.push({
        ...action.payload.ingredient,
        uniqueId: action.payload.uniqueId,
      });
    },
    removeIngredient: (
      state: ISliceState,
      action: PayloadAction<IIngredient>
    ) => {
      const filteredIngredients = state.ingredients.filter(
        (item) => item.uniqueId !== action.payload.uniqueId
      );
      state.ingredients = filteredIngredients;
    },
    moveIngredient: (
      state: ISliceState,
      action: PayloadAction<MoveIngredients>
    ) => {
      let newIngredients = [...state.ingredients];
      arraymove(
        newIngredients,
        action.payload.dragIndex,
        action.payload.hoverIndex
      );
      state.ingredients = newIngredients;
    },
    addOrReplaceBun: (state, action: PayloadAction<IIngredient>) => {
      state.bun = action.payload;
    },
    removeBun: (state) => {
      let newState = { ...state, bun: initialState.bun };
      return newState;
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  addOrReplaceBun,
  removeBun,
  resetState,
} = constructorIngredients.actions;

export default constructorIngredients.reducer;
