import { Tab } from "../types";

export const enum IngredientType {
  bun = "bun",
  sauce = "sauce",
  main = "main",
}

export const INGREDIENT_TYPE_TEXT = {
  [IngredientType.bun]: "Булки",
  [IngredientType.sauce]: "Соусы",
  [IngredientType.main]: "Начинки",
};
export const Tabs: Array<Tab> = [
  {
    _id: 0,
    name: "Булки",
    value: "one",
    type: "bun",
  },
  {
    _id: 1,
    name: "Соусы",
    value: "two",
    type: "sauce",
  },
  {
    _id: 2,
    name: "Начинки",
    value: "three",
    type: "main",
  },
];
