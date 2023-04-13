import React, { useEffect, useState } from "react";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "./burger-constructor.module.css";
import { IIngredient, IngredientType } from "../constants";
import Modal from "../modal/modal-template";
import ModalTotal from "../order-details/order-details";

const BurgerConstructor = ({ selected }: { selected: IIngredient[] }) => {
  const [price, setPrice] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const bunElementHandler = (
    chosenIngredients: IIngredient[],
    property: keyof IIngredient,
    trueValue: string,
    falseValue: string
  ) => {
    const bun = chosenIngredients.find(
      (ingredient: IIngredient) => ingredient.type === IngredientType.bun
    );

    return bun ? `${bun[property]} ${trueValue}` : falseValue;
  };

  useEffect(() => {
    const totalPrice = selected.reduce(
      (acc: number, item: IIngredient) =>
        acc + item.price * (item.type === IngredientType.bun ? 2 : 1),
      0
    );
    setPrice(totalPrice);
  }, [selected]);

  return (
    <div className={`${constructorStyles["constructor-wrapper"]}`}>
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
      <div
        className={`${constructorStyles["burger-constructor"]} custom-scroll`}
      >
        <ul className={`${constructorStyles.item}`}>
          {selected.map(
            (ingredient: IIngredient) =>
              ingredient.type !== IngredientType.bun && (
                <div
                  key={ingredient._id}
                  className={`${constructorStyles["item-inner"]} mt-2 mb-2`}
                >
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
      </div>
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
