import { IIngredient } from "../../constants";
import React, { Fragment } from "react";
import cardsStyles from "../card/burger-ingredients-card.module.css";

const ModalIngredient = ({ ingredient }: { ingredient: IIngredient }) => {
  const { name, image_large, calories, carbohydrates, fat, proteins } =
    ingredient;

  return (
    <Fragment>
      <div className={`${cardsStyles["card"]} mt-6 mb-10`}>
        <div className={cardsStyles["card-image-container"]}>
          <img alt="not" src={image_large}></img>
        </div>
        <p
          className={`${cardsStyles["card-name"]} text text_type_main-medium mt-4 mb-8`}
        >
          {name}
        </p>
        <div
          className={`${cardsStyles.values} text text_type_main-default text_color_inactive`}
        >
          <div>
            Калории,ккал
            <div className="text text_type_digits-default text_color_inactive">
              {calories}
            </div>
          </div>
          <div>
            Белки,г
            <div className="text text_type_digits-default text_color_inactive">
              {proteins}
            </div>
          </div>
          <div>
            Жиры,г
            <div className="text text_type_digits-default text_color_inactive">
              {fat}
            </div>
          </div>
          <div>
            Углеводы,г
            <div className="text text_type_digits-default text_color_inactive">
              {carbohydrates}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ModalIngredient;
