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
  image: string;
  image_large: string;
  image_mobile: string;
  price: number;
  _v: number;
  _id: string;
}
