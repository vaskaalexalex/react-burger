import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { OrderInfo } from "../../components/order-info/order-info";

import styles from "./order-info-page.module.css";
import { getOrderByNumber } from "../../services/reducers/order-details";
import { Loading } from "../../components/loading/loading";

export function OrderInfoPage() {
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
    content = <OrderInfo orderData={orderData} />;
  }

  return <div className={`${styles["container"]} mt-30`}>{content}</div>;
}
