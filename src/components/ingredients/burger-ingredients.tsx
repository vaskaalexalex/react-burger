import React, { Dispatch, useRef, SetStateAction, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { data as ingredients } from "../../utils/data";
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
}: {
  selected: IIngredient[];
  setSelected: Dispatch<SetStateAction<IIngredient[]>>;
}) => {
  const [current, setCurrent] = useState(
    INGREDIENT_TYPE_TEXT[IngredientType.bun]
  );

  const bunAnchor = useRef<null | HTMLDivElement>(null);
  const sauceAnchor = useRef<null | HTMLDivElement>(null);
  const mainAnchor = useRef<null | HTMLDivElement>(null);

  const handleScroll = (ref: any, current: any): void => {
    ref.current.scrollIntoView({ behavior: "smooth" });
    setCurrent(current);
  };

  const buns = ingredients.filter((item) => item.type === IngredientType.bun);
  const sauces = ingredients.filter(
    (item) => item.type === IngredientType.sauce
  );
  const mains = ingredients.filter((item) => item.type === IngredientType.main);

  return (
    <div className={ingredientsStyles["ingredients-container"]}>
      <p className={`text text_type_main-large mt-10`}>Соберите бургер</p>
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
          {buns?.map((bun: any) => {
            return (
              <IngredientCard
                key={bun.id}
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
          {sauces?.map((sauce: any) => {
            return (
              <IngredientCard
                key={sauce.id}
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
          {mains?.map((main: any) => {
            return (
              <IngredientCard
                key={main.id}
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
