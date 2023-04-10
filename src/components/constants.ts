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
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  type: IngredientType.bun | IngredientType.main | IngredientType.sauce;
  price: number;
  proteins: number;
  _v: number;
  _id: string;
}
