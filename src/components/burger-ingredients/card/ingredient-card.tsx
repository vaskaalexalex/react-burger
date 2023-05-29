import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import cardsStyles from "./burger-ingredients-card.module.css";
import { IIngredient } from "../../constants";
import { useDrag } from "react-dnd";
import { IngredientCounter } from "./ingredient-counter/ingredient-counter";

interface IngredientCardProps {
  counter: number;
  ingredient: IIngredient;
  onClick: () => void;
}

const IngredientCard = ({
  counter,
  ingredient,
  onClick,
}: IngredientCardProps) => {
  const { name, image, price } = ingredient;

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  return (
    <>
      <div className={`${cardsStyles["card"]} mt-6 mb-10`} ref={dragRef}>
        <div className={cardsStyles["card-image-container"]} onClick={onClick}>
          <img alt="not" src={image}></img>
        </div>
        <div className={`${cardsStyles["card-price"]} mb-1 mt-1`}>
          <p className="text text_type_digits-small mr-2">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${cardsStyles["card-name"]} text text_type_main-small`}>
          {name}
        </p>
      </div>
      <IngredientCounter count={counter} />
    </>
  );
};

export default IngredientCard;
