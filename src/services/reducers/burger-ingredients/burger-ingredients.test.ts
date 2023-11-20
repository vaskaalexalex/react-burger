import { configureStore } from "@reduxjs/toolkit";

import reducer, { initialState, fetchIngredients } from "./burger-ingredients";
import { ingredients } from "../mock";

describe("Redux burger ingredients reducer", () => {
  let store = configureStore({
    reducer: reducer,
    preloadedState: initialState,
  });

  beforeEach(() => {
    store = configureStore({
      reducer: reducer,
      preloadedState: initialState,
    });
  });

  afterEach(() => {
    jest.spyOn(global, "fetch").mockClear();
  });

  test("Should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  test("Should fulfill fetchIngredients", async () => {
    jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          json: () => ({ data: ingredients, success: true }),
          ok: true,
        })
      ) as jest.Mock
    );

    await store.dispatch(fetchIngredients());

    expect(fetch).toBeCalledTimes(1);

    expect(store.getState()).toEqual({
      error: "",
      ingredients: ingredients,
      status: "succeeded",
    });
  });

  test("Should fail fetchIngredients", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(jest.fn(() => Promise.reject()) as jest.Mock);

    await store.dispatch(fetchIngredients());

    expect(fetch).toBeCalledTimes(1);

    expect(store.getState()).toEqual({
      error: "Rejected",
      ingredients: [],
      status: "failed",
    });
  });
});
