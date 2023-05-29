import { combineReducers } from "@reduxjs/toolkit";
import burgerDetails from "./reducers/ingredients-details";
import allIngredients from "./reducers/burger-ingredients";
import constructorIngredients from "./reducers/burger-constructor";
import orderDetails from "./reducers/order-details";

const rootReducer = combineReducers({
  ingredientDetails: burgerDetails,
  burgerIngredients: allIngredients,
  constructorIngredients: constructorIngredients,
  orderDetails: orderDetails,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
