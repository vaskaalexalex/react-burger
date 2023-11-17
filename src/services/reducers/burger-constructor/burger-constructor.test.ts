import reducer, {
  addIngredient,
  addOrReplaceBun,
  initialState,
  moveIngredient,
  removeBun,
  removeIngredient,
  resetState,
} from "./burger-constructor";
import { v4 as uuidv4 } from "uuid";
import { IIngredient } from "../../../types";
import { IngredientType } from "../../../components/constants";

const uniqueIdFirst = uuidv4();
const uniqueIdSecond = uuidv4();

const ingredientFirst: IIngredient = {
  _id: "60d3b41abdacab0026a733c9",
  id: "60d3b41abdacab0026a733c9",
  uniqueId: uniqueIdFirst,
  name: "Мясо бессмертных моллюсков Protostomia",
  type: IngredientType.main,
  proteins: 433,
  fat: 244,
  carbohydrates: 33,
  calories: 420,
  price: 1337,
  image: "https://code.s3.yandex.net/react/code/meat-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
  __v: 0,
};

const ingredientSecond: IIngredient = {
  _id: "60d3b41abdacab0026a733c9",
  id: "60d3b41abdacab0026a733c9",
  uniqueId: uniqueIdSecond,
  name: "Мясо бессмертных моллюсков Protostomia",
  type: IngredientType.main,
  proteins: 433,
  fat: 244,
  carbohydrates: 33,
  calories: 420,
  price: 1337,
  image: "https://code.s3.yandex.net/react/code/meat-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
  __v: 0,
};

const bun: IIngredient = {
  _id: "60d3b41abdacab0026a733c6",
  id: "60d3b41abdacab0026a733c6",
  name: "Краторная булка N-200i",
  type: IngredientType.bun,
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  uniqueId: uniqueIdFirst,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0,
};

const secondBun: IIngredient = {
  _id: "60d3b41abdacab0026a733c7",
  id: "60d3b41abdacab0026a733c7",
  name: "Флюоресцентная булка R2-D3",
  type: IngredientType.bun,
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  uniqueId: uniqueIdSecond,
  image: "https://code.s3.yandex.net/react/code/bun-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
  __v: 0,
};

const stateWithIngredients = {
  bun,
  ingredients: [ingredientFirst, ingredientSecond],
};

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
