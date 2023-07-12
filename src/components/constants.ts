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

export interface IIngredient {
  id: string;
  name: string;
  type: IngredientType.bun | IngredientType.main | IngredientType.sauce;
  fat: number;
  calories: number;
  carbohydrates: number;
  proteins: number;
  image: any;
  image_large: string;
  image_mobile: string;
  price: number;
  __v: number;
  _id: string;
  uniqueId: string;
  index?: number;
}

export interface IOrder {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  status: "created" | "pending" | "done";
  updatedAt: string;
  _id: string;
}

interface Tab {
  _id: number;
  name: string;
  value: string;
  type: string;
}
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
