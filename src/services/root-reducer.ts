import { combineReducers } from "@reduxjs/toolkit";
import burgerDetails from "./reducers/ingredients-details";
import allIngredients from "./reducers/burger-ingredients";
import constructorIngredients from "./reducers/burger-constructor";
import orderDetails from "./reducers/order-details";
import authUser from "./reducers/auth";
import { webSocketApi } from "./sockets/web-sockets";

const rootReducer = combineReducers({
  ingredientDetails: burgerDetails,
  burgerIngredients: allIngredients,
  constructorIngredients: constructorIngredients,
  orderDetails: orderDetails,
  authUser: authUser,
  [webSocketApi.reducerPath]: webSocketApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
