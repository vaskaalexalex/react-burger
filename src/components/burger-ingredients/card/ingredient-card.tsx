import React, { useState } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import cardsStyles from "./burger-ingredients-card.module.css";
import Modal from "../../modal/modal-template";
import ModalIngredient from "../../ingredient-details/ingredient-details";
import { IIngredient } from "../../constants";

const IngredientCard = ({
  ingredient,
  setSelected,
  selected,
}: {
  ingredient: IIngredient;
  selected: IIngredient[];
  setSelected: (items: IIngredient[]) => void;
}) => {
  const { name, image, price } = ingredient;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddIngredient = () => {
    setSelected([...selected, ingredient]);
  };

  return (
    <>
      <div
        className={`${cardsStyles["card"]} mt-6 mb-10`}
        onClick={handleAddIngredient}
      >
        <div
          className={cardsStyles["card-image-container"]}
          onClick={handleModalOpen}
        >
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
      {isModalOpen && (
        <Modal onClose={handleModalClose} title="Добавить ингридиент">
          <ModalIngredient ingredient={ingredient} />
        </Modal>
      )}
    </>
  );
};

export default IngredientCard;
