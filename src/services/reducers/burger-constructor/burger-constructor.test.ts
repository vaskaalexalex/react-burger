import reducer, {
  addIngredient,
  addOrReplaceBun,
  initialState,
  moveIngredient,
  removeBun,
  removeIngredient,
  resetState,
} from "./burger-constructor";
import {
  ingredientFirst,
  ingredientSecond,
  secondBun,
  stateWithIngredients,
  uniqueIdFirst,
} from "../mock";

describe("Redux burger constructor reducer", () => {
  test("Should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  test("Should handle addition of ingredient to empty initial state", () => {
    expect(
      reducer(
        initialState,
        addIngredient({ ingredient: ingredientFirst, uniqueId: uniqueIdFirst })
      )
    ).toEqual({
      ...initialState,
      ingredients: [ingredientFirst],
    });
  });

  test("Should remove ingredient", () => {
    expect(
      reducer(stateWithIngredients, removeIngredient(ingredientFirst))
    ).toEqual({
      ...stateWithIngredients,
      ingredients: [ingredientSecond],
    });
  });

  test("Should move ingredient from 0 to 1 position", () => {
    expect(
      reducer(
        stateWithIngredients,
        moveIngredient({ hoverIndex: 0, dragIndex: 1 })
      )
    ).toEqual({
      ...stateWithIngredients,
      ingredients: [ingredientSecond, ingredientFirst],
    });
  });

  test("Should add bun", () => {
    expect(reducer(initialState, addOrReplaceBun(secondBun))).toEqual({
      ...initialState,
      bun: secondBun,
    });
  });

  test("Should replace bun", () => {
    expect(reducer(stateWithIngredients, addOrReplaceBun(secondBun))).toEqual({
      ...stateWithIngredients,
      bun: secondBun,
    });
  });

  test("Should remove bun", () => {
    expect(reducer(stateWithIngredients, removeBun())).toEqual({
      ...stateWithIngredients,
      bun: initialState.bun,
    });
  });

  test("Should return initial state", () => {
    expect(reducer(stateWithIngredients, resetState())).toEqual(initialState);
  });
});
