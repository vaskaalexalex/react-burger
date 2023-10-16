import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { IngredientCard } from "./card/ingredient-card";
import ingredientsStyles from "./burger-ingredients.module.css";
import { IngredientType, Tabs } from "../constants";
import { addDataToModal } from "../../services/reducers/ingredients-details";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { IIngredient } from "../../types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, useNavigate } from "react-router-dom";

interface CounterType extends Record<string, any> {
  id?: number;
}

const typesMap = {
  bun: "Булки",
  main: "Начинки",
  sauce: "Соусы",
};

const BurgerIngredients = () => {
  const dispatch = useAppDispatch();
  const tabsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const ingredients = useAppSelector(
    (state: any) => state.burgerIngredients.ingredients
  );

  const [tab, setTab] = useState("one");
  const mainRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const bunsRef = useRef<HTMLDivElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleClick = useCallback((value: string) => {
    value === "one"
      ? bunsRef.current?.scrollIntoView({ behavior: "smooth" })
      : value === "two"
      ? sauceRef.current?.scrollIntoView({ behavior: "smooth" })
      : mainRef.current?.scrollIntoView({ behavior: "smooth" });
    setTab(value);
  }, []);

  useEffect((): any => {
    const targets = [bunsRef.current, sauceRef.current, mainRef.current];
    const options = {
      root: scrollRef.current,
      rootMargin: "0px 0px -90% 0px",
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === bunsRef.current) {
            setTab("one");
          }
          if (entry.target === sauceRef.current) {
            setTab("two");
          }
          if (entry.target === mainRef.current) {
            setTab("three");
          }
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    targets.forEach((target) => {
      if (target) observer.observe(target);
    });
  }, []);

  const refs = {
    bun: bunsRef,
    sauce: sauceRef,
    main: mainRef,
  };

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

  useEffect(() => {
    if (location.state && location.state.id) {
      const ingredient = ingredients.find(
        (_ingredient: IIngredient) => _ingredient._id === location.state.id
      );
      if (ingredient) {
        const modalData = {
          modalImage: ingredient.image_large,
          modalName: ingredient.name,
          modalCalories: ingredient.calories,
          modalProteins: ingredient.price,
          modalFat: ingredient.fat,
          modalCarbohydrates: ingredient.carbohydrates,
        };
        dispatch(addDataToModal(modalData));
      }
    }
  }, [dispatch, ingredients, location.state]);

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
      navigate(`/ingredients/${ingredient._id}`, {
        state: { background: location, id: ingredient._id },
      });
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
    [dispatch, location, navigate]
  );

  const handleScroll = () => {
    const containerPosition = scrollRef?.current?.getBoundingClientRect().top;

    type CategoriesPositions = Record<IngredientType, number>;

    const categoriesPositions: CategoriesPositions = {} as CategoriesPositions;

    Object.keys(typesMap)
      .map((key) => key as IngredientType)
      .forEach((type: IngredientType) => {
        categoriesPositions[type] = Math.abs(
          // @ts-ignore
          containerPosition - refs[type].current?.getBoundingClientRect()?.top
        );
      });

    const minCategoryPosition = Math.min(...Object.values(categoriesPositions));

    const currentTab = Object.keys(categoriesPositions).find(
      // @ts-ignore
      (key) => minCategoryPosition === categoriesPositions[key]
    );
    // @ts-ignore
    setTab(currentTab);
  };

  return (
    <div className={ingredientsStyles["ingredients-container"]}>
      <p className={`text text_type_main-large mt-10 mb-5`}>Соберите бургер</p>
      <div className={ingredientsStyles.container}>
        <Tab
          value="one"
          active={tab === "one"}
          onClick={() => handleClick("one")}
        >
          Булки
        </Tab>
        <Tab
          value="two"
          active={tab === "two"}
          onClick={() => handleClick("two")}
        >
          Соусы
        </Tab>
        <Tab
          value="three"
          active={tab === "three"}
          onClick={() => handleClick("three")}
        >
          Начинки
        </Tab>
      </div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className={`${ingredientsStyles["ingredients"]} custom-scroll`}
      >
        <div className={ingredientsStyles["components"]} ref={tabsRef}>
          {Tabs.map((tab, index) => (
            <section
              key={tab._id}
              className={`${tab._id}`}
              // @ts-ignore
              ref={refs[tab?.type]}
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
