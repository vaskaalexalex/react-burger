import React, { useCallback, useMemo, useRef } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from "uuid";
import constructorStyles from "./burger-constructor.module.css";
import { IngredientType } from "../constants";
import { Modal } from "../modal/modal-template";
import ModalTotal from "../order-details/order-details";
import {
  addIngredient,
  addOrReplaceBun,
  moveIngredient,
  removeBun,
  removeIngredient,
  resetState,
} from "../../services/reducers/burger-constructor";
import { useDrop } from "react-dnd";
import { createOrder } from "../../services/reducers/order-details";
import { BurgerBunItem } from "./burger-bun/burger-bun";
import { BurgerContent } from "./burger-content/burger-content";
import { TotalPrice } from "../total-price/total-price";
import { useAppDispatch, useAppSelector, useModal } from "../../services/hooks";
import { IIngredient } from "../../types";
import { useNavigate } from "react-router-dom";
import { userAuthorized } from "../../utils";

const BurgerConstructor = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const dispatch = useAppDispatch();
  const dropRef = useRef<HTMLUListElement>(null);
  const { ingredients, bun } = useAppSelector(
    (state: any) => state.constructorIngredients
  );
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.authUser);

  function closePortal() {
    closeModal();
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

  const handleCreateOrder = () => {
    if (userAuthorized(user)) {
      openModal();

      dispatch(
        createOrder({
          ingredients: ingredients,
          bun: bun,
        })
      );
      localStorage.removeItem("constructorIngredients");
    } else {
      navigate("/login", {
        state: { from: "/" },
        replace: true,
      });
    }
  };

  const price = useMemo(() => {
    return ingredients.reduce(
      (acc: number, item: IIngredient) =>
        acc + item.price * (item.type === IngredientType.bun ? 2 : 1),
      0
    );
  }, [ingredients]);

  return (
    <div
      className={`${constructorStyles["constructor-wrapper"]} custom-scroll`}
      ref={dropTarget}
    >
      <div
        key="burger-constructor"
        ref={dropTarget}
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
            <ul className={`${constructorStyles.item}`} ref={dropRef}>
              {ingredients.map((item: IIngredient, index: number) => {
                const lastIndex = index === ingredients.length - 1;
                return (
                  <BurgerContent
                    bottomPadding={!lastIndex}
                    key={item.uniqueId}
                    index={index}
                    moveCard={moveCard}
                    ingredient={item}
                    draggable={true}
                    handleClose={deleteIngredient(item)}
                  />
                );
              })}
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
        <div className={`${constructorStyles.total}`}>
          <TotalPrice price={price} size={"medium"} />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={handleCreateOrder}
          disabled={!(ingredients.length && bun._id)}
        >
          Заказать
        </Button>
      </div>
      {isModalOpen && (
        <Modal onClose={closePortal} title="">
          <ModalTotal />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructor;
