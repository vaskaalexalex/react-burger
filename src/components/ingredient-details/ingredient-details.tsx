import React, { Fragment, useEffect } from "react";
import cardsStyles from "./ingredients-modal.module.css";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { useParams } from "react-router-dom";
import { addDataToModal } from "../../services/reducers/ingredients-details/ingredients-details";

const IngredientDetails = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const ingredients = useAppSelector(
    (state) => state.burgerIngredients.ingredients
  );

  useEffect((): void => {
    const ingredient = ingredients.find((obj) => obj._id === id);
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
  }, [dispatch, id, ingredients]);

  const {
    modalImage,
    modalName,
    modalCalories,
    modalProteins,
    modalFat,
    modalCarbohydrates,
  } = useAppSelector((state) => state.ingredientDetails);

  return (
    <Fragment>
      <div className={`${cardsStyles["card"]} mt-6 mb-10`}>
        <div className={cardsStyles["card-image-container"]}>
          <img alt="not" src={modalImage} />
        </div>
        <p
          className={`${cardsStyles["card-name"]} text text_type_main-medium mt-4 mb-8`}
        >
          {modalName}
        </p>
        <div
          className={`${cardsStyles.values} text text_type_main-default text_color_inactive`}
        >
          <div>
            Калории,ккал
            <div className="text text_type_digits-default text_color_inactive">
              {modalCalories}
            </div>
          </div>
          <div>
            Белки,г
            <div className="text text_type_digits-default text_color_inactive">
              {modalProteins}
            </div>
          </div>
          <div>
            Жиры,г
            <div className="text text_type_digits-default text_color_inactive">
              {modalFat}
            </div>
          </div>
          <div>
            Углеводы,г
            <div className="text text_type_digits-default text_color_inactive">
              {modalCarbohydrates}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export { IngredientDetails };
