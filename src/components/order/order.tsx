import { useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { IngredientsPreview } from "./components/ingredients-preview";
import { TotalPrice } from "../total-price/total-price";
import {
  formatDisplayDate,
  generateIngredientsFromIds,
  getTotalPriceOfIngredients,
} from "../../utils";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { addDataToModal } from "../../services/reducers/order-details";

import styles from "./order.module.css";
import { IOrder } from "../../types";

interface Props {
  order: IOrder;
}

export function Order(props: Props) {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const allIngredients = useAppSelector(
    (state) => state.burgerIngredients.ingredients
  );

  const localIngredients = useMemo(
    () => generateIngredientsFromIds(allIngredients, props.order.ingredients),
    [allIngredients, props.order.ingredients]
  );

  const totalPrice = useMemo(
    () => getTotalPriceOfIngredients(localIngredients),
    [localIngredients]
  );

  const ruStatus = useMemo(() => {
    switch (props.order.status) {
      case "done":
        return "Выполнен";
      case "pending":
        return "Готовится";
      case "created":
        return "Создан";
    }
  }, [props.order.status]);

  const modalData = useCallback(() => {
    navigate(`${props.order.number}`, {
      state: { background: location, id: props.order.number },
    });
    dispatch(addDataToModal(props.order));
  }, [dispatch, location, navigate, props.order]);

  return (
    <div
      className={`${styles["order-container"]} ml-2 mr-2 mb-4`}
      onClick={modalData}
    >
      <div className={styles["order-container_inner"]}>
        <div className={`${styles["order-number-date"]} mb-6`}>
          <p className="text text_type_digits-default">#{props.order.number}</p>
          <p className="text text_type_main-default text_color_inactive">
            {formatDisplayDate(props.order.createdAt)}
          </p>
        </div>
        <div className="mb-2">
          <h1 className="text text_type_main-medium">{props.order.name}</h1>
        </div>
        <div className="mb-6">
          <h1
            className={`${
              props.order.status === "done" ? styles["success"] : null
            } text text_type_main-default`}
          >
            {ruStatus}
          </h1>
        </div>
        <div className={styles["ingredients-container"]}>
          <IngredientsPreview ingredients={localIngredients} />
          <div className={`${styles["total-price"]} pl-6`}>
            <TotalPrice price={totalPrice} />
          </div>
        </div>
      </div>
    </div>
  );
}
