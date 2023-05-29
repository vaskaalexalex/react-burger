import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from "uuid";
import constructorStyles from "./burger-constructor.module.css";
import { IIngredient } from "../constants";
import Modal from "../modal/modal-template";
import ModalTotal from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  addIngredient,
  addOrReplaceBun,
  moveIngredient,
  removeBun,
  removeIngredient,
  resetState,
} from "../../services/reducers/burger-constructor";
import { useDrop } from "react-dnd";
import { getOrderNumber } from "../../services/reducers/order-details";
import { BurgerBunItem } from "./burger-bun/burger-bun";
import { BurgerContent } from "./burger-content/burger-content";

const BurgerConstructor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const dropRef = useRef<HTMLUListElement>(null);
  const { ingredients, bun } = useSelector(
    (state: any) => state.constructorIngredients
  );
  function closeModal() {
    setIsModalOpen(false);
    dispatch(resetState());
  }

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient: IIngredient) {
      const uniqueId = uuidv4();
      ingredient.type === "bun"
        ? dispatch(addOrReplaceBun(ingredient))
        : dispatch(addIngredient({ ingredient, uniqueId }));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const borderColor = isHover ? "#8585AD" : "transparent";

  const deleteIngredient = useCallback(
    (ingredient: IIngredient) => () => {
      dispatch(removeIngredient(ingredient));
    },
    [dispatch]
  );

  const deleteBun = useCallback(() => {
    dispatch(removeBun());
  }, [dispatch]);

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      dispatch(moveIngredient({ hoverIndex, dragIndex }));
    },
    [dispatch]
  );

  const createOrder = () => {
    setIsModalOpen(true);
    dispatch(
      getOrderNumber({
        ingredients: ingredients,
        bun: bun,
      }) as any
    );
  };

  const price = useMemo(() => {
    return (
      (bun.price ? bun.price * 2 : 0) +
      ingredients.reduce(
        ({ s, v }: { s: number; v: IIngredient }) => s + v.price,
        0
      )
    );
  }, [bun.price, ingredients]);

  return (
    <>
      <div
        className={`${constructorStyles["constructor-wrapper"]}`}
        ref={dropTarget}
      >
        <div
          key="burger-constructor"
          ref={dropTarget}
          data-testid="constructor-drop-target"
          style={{ borderColor: borderColor }}
          className={constructorStyles["burger-constructor"]}
        >
          {ingredients.length !== 0 || bun.price !== 0 ? (
            <>
              <BurgerBunItem
                place={"top"}
                ingredient={bun}
                handleClose={deleteBun}
              />
              <ul className={constructorStyles["inner_style"]} ref={dropRef}>
                {ingredients.map(
                  ({
                    ingredient,
                    index,
                  }: {
                    ingredient: IIngredient;
                    index: number;
                  }) => {
                    const newItem = {
                      ...ingredient,
                      index: index,
                    };
                    const lastIndex = index === ingredients!.length - 1;
                    return (
                      <BurgerContent
                        bottomPadding={!lastIndex}
                        key={newItem.uniqueId}
                        index={index}
                        moveCard={moveCard}
                        ingredient={newItem}
                        draggable={true}
                        handleClose={deleteIngredient(newItem)}
                      />
                    );
                  }
                )}
              </ul>
              <BurgerBunItem
                place={"bottom"}
                ingredient={bun}
                handleClose={deleteBun}
              />
            </>
          ) : (
            <div className={constructorStyles["helper"]}>
              <div
                className={`${constructorStyles["helper_shadow"]} text text_type_main-large mb-30 mt-30`}
              >
                Перетащите сюда ингредиент
              </div>
            </div>
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
            onClick={createOrder}
          >
            Заказать
          </Button>
        </div>
        {isModalOpen && (
          <Modal onClose={closeModal} title="">
            <ModalTotal />
          </Modal>
        )}
      </div>
    </>
  );
};

export default BurgerConstructor;
