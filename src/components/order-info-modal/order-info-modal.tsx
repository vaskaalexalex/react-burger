import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { OrderInfo } from "../order-info/order-info";

import styles from "./order-info-modal.module.css";
import { getOrderByNumber } from "../../services/reducers/order-details";
import { Loading } from "../loading/loading";

export function OrderInfoModal() {
  let content = <Loading text="Загружаются данные заказа" />;
  const dispatch = useAppDispatch();

  const params = useParams();

  const { orderData } = useAppSelector((state) => state.orderDetails);

  useEffect(() => {
    if (orderData === undefined && params && params.id) {
      dispatch(getOrderByNumber(Number(params.id)));
    }
  }, [dispatch, orderData, params]);

  if (orderData) {
    content = <OrderInfo orderData={orderData} isModal />;
  }

  return (
    <div className={`${styles["container"]} ml-10 mr-10 mb-10`}>{content}</div>
  );
}
