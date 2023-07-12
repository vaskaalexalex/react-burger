import React, { useCallback, useMemo, useRef, useState } from "react";
import IngredientCard from "./card/ingredient-card";
import ingredientsStyles from "./burger-ingredients.module.css";
import { IIngredient, IngredientType, Tabs } from "../constants";
import { IngredientsTabs } from "./tabs/ingredient-tabs";
import { addDataToModal } from "../../services/reducers/ingredients-details";
import { useAppDispatch, useAppSelector } from "../../services/hooks";

interface CounterType extends Record<string, any> {
  id?: number;
}

const BurgerIngredients = () => {
  const dispatch = useAppDispatch();
  const tabsRef = useRef<HTMLDivElement>(null);

  const ingredients = useAppSelector(
    (state: any) => state.burgerIngredients.ingredients
  );
  const containerRef = useRef<any>();

  const typesMap = Tabs.map((tab) => tab.type);
  const refs: any = [];

  const [tab, setTab] = useState("one");

  const constructorIngredients = useAppSelector(
    (state: any) => state.constructorIngredients
  );

  const buns = useMemo(
    () =>
      ingredients.filter(
        (ingredient: IIngredient) => ingredient.type === IngredientType.bun
      ),
    [ingredients]
  );

  const mains = useMemo(
    () =>
      ingredients.filter(
        (ingredient: IIngredient) => ingredient.type === IngredientType.main
      ),
    [ingredients]
  );

  const sauces = useMemo(
    () =>
      ingredients.filter(
        (ingredient: IIngredient) => ingredient.type === IngredientType.sauce
      ),
    [ingredients]
  );

  const ingredientsCategories = [buns, sauces, mains];

  const ingredientsCounter = useMemo(() => {
    const { bun, ingredients } = constructorIngredients;
    const counters: CounterType = {};
    ingredients.forEach((ingredient: IIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (bun) counters[bun._id] = 2;
    return counters;
  }, [constructorIngredients]);

  const modalData = useCallback(
    (ingredient: IIngredient) => () => {
      const modalData = {
        modalImage: ingredient.image_large,
        modalName: ingredient.name,
        modalCalories: ingredient.calories,
        modalProteins: ingredient.price,
        modalFat: ingredient.fat,
        modalCarbohydrates: ingredient.carbohydrates,
      };
      dispatch(addDataToModal(modalData));
    },
    [dispatch]
  );

  const handleScroll = () => {
    const containerPosition = containerRef.current.getBoundingClientRect().top;

    const categoriesPositions: any = {};

    Object.keys(typesMap).map(
      (type) =>
        (categoriesPositions[type] = Math.abs(
          containerPosition - refs[type].getBoundingClientRect().top
        ))
    );

    // @ts-ignore
    const minCategoryPosition = Math.min(...Object.values(categoriesPositions));

    const currentTab = Object.keys(categoriesPositions).find(
      (key) => minCategoryPosition === categoriesPositions[key]
    );

    // @ts-ignore
    setTab(currentTab);
  };

  return (
    <div className={ingredientsStyles["ingredients-container"]}>
      <p className={`text text_type_main-large mt-10 mb-5`}>Соберите бургер</p>
      <IngredientsTabs tabsRef={tabsRef} />

      <div className={`${ingredientsStyles["ingredients"]} custom-scroll`}>
        <div className={ingredientsStyles["components"]} ref={tabsRef}>
          {Tabs.map((tab, index) => (
            <section
              key={tab._id}
              className={`${tab._id}`}
              ref={containerRef}
              onScroll={handleScroll}
            >
              <p className={`text text_type_main-medium`}>{tab.name}</p>
              <div className={ingredientsStyles["item-container"]}>
                {ingredientsCategories[index].map((ingredient: IIngredient) => (
                  <IngredientCard
                    key={ingredient._id}
                    ingredient={ingredient}
                    onClick={modalData(ingredient)}
                    counter={ingredientsCounter[ingredient._id]}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BurgerIngredients;
