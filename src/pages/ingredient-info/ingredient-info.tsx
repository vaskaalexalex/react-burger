import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { IngredientDetails } from "../../components/ingredient-details/ingredient-details";

import styles from "./ingredient-info-module.css";

function IngredientInfo() {
  let content;
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const ingredients = useAppSelector(
    (state) => state.burgerIngredients.ingredients
  );

  const [ingredientExists, setIngredientExists] = useState(false);

  useEffect(() => {
    const ingredient = ingredients.find((obj) => obj._id === id);
    if (ingredient) {
      setIngredientExists(true);
    }
  }, [dispatch, id, ingredients]);

  if (ingredientExists) {
    content = <IngredientDetails />;
  } else {
    content = (
      <p className={`${styles["text-shadow"]} text text_type_main-large`}>
        Такого ингредиента не существует
      </p>
    );
  }

  return <div className={`${styles["container"]} mt-30`}>{content}</div>;
}

export { IngredientInfo };
