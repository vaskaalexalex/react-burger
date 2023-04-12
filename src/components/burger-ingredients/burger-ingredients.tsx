import React, { Dispatch, useRef, SetStateAction, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from "./card/ingredient-card";
import ingredientsStyles from "./burger-ingredients.module.css";
import {
  IIngredient,
  INGREDIENT_TYPE_TEXT,
  IngredientType,
} from "../constants";

const BurgerIngredients = ({
  selected,
  setSelected,
  ingredients,
}: {
  ingredients: IIngredient[];
  selected: IIngredient[];
  setSelected: Dispatch<SetStateAction<IIngredient[]>>;
}) => {
  const [current, setCurrent] = useState(IngredientType.bun);
  const bunAnchor = useRef<null | HTMLDivElement>(null);
  const sauceAnchor = useRef<null | HTMLDivElement>(null);
  const mainAnchor = useRef<null | HTMLDivElement>(null);

  //TODO: types for ref and current
  const handleScroll = (ref: any, current: any): void => {
    ref.current.scrollIntoView({ behavior: "smooth" });
    setCurrent(current);
  };

  const buns = ingredients.filter(
    (item: { type: IngredientType }) => item.type === IngredientType.bun
  );
  const sauces = ingredients.filter(
    (item: { type: IngredientType }) => item.type === IngredientType.sauce
  );
  const mains = ingredients.filter(
    (item: { type: IngredientType }) => item.type === IngredientType.main
  );

  return (
    <div className={ingredientsStyles["ingredients-container"]}>
      <p className={`text text_type_main-large mt-10 mb-5`}>Соберите бургер</p>
      <div className={`${ingredientsStyles.tabs}`}>
        <Tab
          value={IngredientType.bun}
          active={current === IngredientType.bun}
          onClick={() => handleScroll(bunAnchor, IngredientType.bun)}
        >
          {INGREDIENT_TYPE_TEXT[IngredientType.bun]}
        </Tab>
        <Tab
          value={IngredientType.sauce}
          active={current === IngredientType.sauce}
          onClick={() => handleScroll(sauceAnchor, IngredientType.sauce)}
        >
          {INGREDIENT_TYPE_TEXT[IngredientType.sauce]}
        </Tab>
        <Tab
          value={IngredientType.main}
          active={current === IngredientType.main}
          onClick={() => handleScroll(mainAnchor, IngredientType.main)}
        >
          {INGREDIENT_TYPE_TEXT[IngredientType.main]}
        </Tab>
      </div>
      <div className={`${ingredientsStyles["ingredients"]} custom-scroll`}>
        <div ref={bunAnchor}>
          <p className={`text text_type_main-medium mt-10`}>
            {INGREDIENT_TYPE_TEXT[IngredientType.bun]}
          </p>
        </div>
        <div className={ingredientsStyles["item-container"]}>
          {buns?.map((bun: IIngredient) => {
            return (
              <IngredientCard
                key={bun._id}
                ingredient={bun}
                selected={selected}
                setSelected={setSelected}
              />
            );
          })}
        </div>
        <div ref={sauceAnchor}>
          <p className={`text text_type_main-medium mt-10`}>
            {INGREDIENT_TYPE_TEXT[IngredientType.sauce]}
          </p>
        </div>
        <div className={ingredientsStyles["item-container"]}>
          {sauces?.map((sauce: IIngredient) => {
            return (
              <IngredientCard
                key={sauce._id}
                ingredient={sauce}
                selected={selected}
                setSelected={setSelected}
              />
            );
          })}
        </div>
        <div ref={mainAnchor}>
          <p className={`text text_type_main-medium mt-10`}>
            {INGREDIENT_TYPE_TEXT[IngredientType.main]}
          </p>
        </div>
        <div className={ingredientsStyles["item-container"]}>
          {mains?.map((main: IIngredient) => {
            return (
              <IngredientCard
                key={main._id}
                ingredient={main}
                selected={selected}
                setSelected={setSelected}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BurgerIngredients;
