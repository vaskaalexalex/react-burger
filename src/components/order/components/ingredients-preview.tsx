import React from "react";

import { IngredientCircleImage } from "../../ingredient-circle-image/ingredient-circle-image";

import styles from "./ingredients-preview.module.css";
import { IIngredient } from "../../../types";

type Props = {
  ingredients: IIngredient[];
};

export function IngredientsPreview({ ingredients }: Props) {
  const localIngredients = ingredients.slice(0, 6);
  const amountOfHiddenIngredients =
    ingredients.length - localIngredients.length;

  return (
    <div className={styles["ingredients-parent"]}>
      {localIngredients.map((ingredient, i) => {
        return (
          <IngredientCircleImage
            position={i}
            image={ingredient.image}
            amount={i === 5 ? amountOfHiddenIngredients : 0}
            key={i}
          />
        );
      })}
    </div>
  );
}
