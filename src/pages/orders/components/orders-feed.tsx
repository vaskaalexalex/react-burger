import { useState, useRef, useEffect } from "react";

import styles from "./orders.module.css";
import { IOrder } from "../../../types";
import { InfinityScroll } from "../../../components/infinity-scroll/infinity-scroll";
import { Loading } from "../../../components/loading/loading";

interface IOrdersFeed {
  orders: IOrder[];
}

function OrdersFeed({ orders }: IOrdersFeed) {
  const ordersRef = useRef<HTMLDivElement>(null);
  const [ordersHeight, setOrdersHeight] = useState(0);

  useEffect(() => {
    setOrdersHeight(ordersRef?.current?.clientHeight ?? 0);
  }, [ordersRef]);

  return (
    <div className={styles["orders_feed"]} ref={ordersRef}>
      {ordersHeight > 0 ? (
        <InfinityScroll orders={orders} height={ordersHeight} />
      ) : (
        <Loading text="Загружаются заказы" />
      )}
    </div>
  );
}

export { OrdersFeed };
