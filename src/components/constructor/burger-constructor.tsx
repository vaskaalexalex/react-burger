import React, { useEffect, useState } from "react";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "./burger-constructor.module.css";
import { IngredientType } from "../constants";
import Modal from "../modal/modal-template";
import ModalTotal from "./modal-total/modal-total";

const BurgerConstructor = ({ selected }: { selected: any }) => {
  const [price, setPrice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const bunElementHandler = (
    chosenIngredients: any,
    property: string,
    trueValue: string,
    falseValue: string
  ) =>
    chosenIngredients.find(
      (ingredient: any) => ingredient.type === IngredientType.bun
    )
      ? // @ts-ignore
        `${
          chosenIngredients.find(
            (ingredient: any) => ingredient.type === IngredientType.bun
          )[property]
        } ${trueValue}`
      : falseValue;

  useEffect(() => {
    const totalPrice = selected.reduce(
      (acc: number, item: any) =>
        acc + item.price * (item.type === IngredientType.bun ? 2 : 1),
      0
    );
    setPrice(totalPrice);
  }, [selected]);

  return (
    <div className={`${constructorStyles["constructor-wrapper"]}`}>
      <div
        className={`${constructorStyles["burger-constructor"]} custom-scroll`}
      >
        <div className={constructorStyles.item}>
          {selected.length > 0 ? (
            <div className="ml-5">
              <ConstructorElement
                type="top"
                text={bunElementHandler(
                  selected,
                  "name",
                  "(верх)",
                  "Выберите булку"
                )}
                price={+bunElementHandler(selected, "price", "", "0")}
                thumbnail={bunElementHandler(selected, "image", "", "")}
              />
            </div>
          ) : (
            <p className="text text_type_main-large">Выберите булку</p>
          )}
        </div>
        <ul className={`${constructorStyles.item}`}>
          {selected.map(
            (ingredient: any) =>
              ingredient.type !== IngredientType.bun && (
                <div className={`${constructorStyles["item-inner"]} mt-2 mb-2`}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                  />
                </div>
              )
          )}
        </ul>
        <div className="ml-5">
          {selected.length > 0 && (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bunElementHandler(
                selected,
                "name",
                "(низ)",
                "Выберите булку"
              )}
              price={+bunElementHandler(selected, "price", "", "0")}
              thumbnail={bunElementHandler(selected, "image", "", "")}
            />
          )}
        </div>
      </div>
      <div className={constructorStyles.price}>
        <div className={`${constructorStyles.total} m-5`}>
          <p className="text text_type_digits-medium m-5">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={handleModalOpen}
        >
          Заказать
        </Button>
      </div>
      {isModalOpen && (
        <Modal onClose={handleModalClose} title="">
          <ModalTotal />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructor;
