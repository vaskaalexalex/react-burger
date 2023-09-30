import React, { Fragment } from "react";
import cardsStyles from "./ingredients-modal.module.css";
import { useAppSelector } from "../../services/hooks";

const IngredientDetails = () => {
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
