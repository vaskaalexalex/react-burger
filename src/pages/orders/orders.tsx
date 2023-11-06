import { useMemo, useState, useRef, useEffect } from "react";

import { Error } from "../../components/error/error";
import { useGetOrdersQuery } from "../../services/sockets/web-sockets";
import { returnOrdersWithStatus } from "../../utils";

import styles from "./orders.module.css";
import { IOrder } from "../../types";
import { InfinityScroll } from "../../components/infinity-scroll/infinity-scroll";
import { Loading } from "../../components/loading/loading";

interface IOrdersFeed {
  orders: IOrder[];
}

function OrdersFeed({ orders }: IOrdersFeed) {
  const ordersRef = useRef<HTMLDivElement>(null);
  const [ordersHeight, setOrdersHeight] = useState(0);

  useEffect(() => {
    setOrdersHeight(ordersRef?.current?.clientHeight ?? 0);
  }, []);

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

interface IStats {
  orders: IOrder[];
  ordersAll: number;
  ordersToday: number;
}

function Stats({ orders, ordersAll, ordersToday }: IStats) {
  const doneOrders = useMemo(
    () => returnOrdersWithStatus("done", orders),
    [orders]
  );
  const createdOrders = useMemo(
    () => returnOrdersWithStatus("pending", orders),
    [orders]
  );

  return (
    <div className={styles["stats"]}>
      <div className={`${styles["stats_orders_container"]} mb-15`}>
        <div className={styles["stats_orders_container_child"]}>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <div className={`${styles["orders_ready"]} pb-2`}>
            {doneOrders.map((order) => (
              <p className="text text_type_digits-default" key={order.number}>
                {order.number}
              </p>
            ))}
          </div>
        </div>
        <div className={styles["stats_orders_container_child"]}>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <div className={`${styles["orders_in_progress"]} pb-2`}>
            {createdOrders.map((order) => (
              <p className="text text_type_digits-default" key={order.number}>
                {order.number}
              </p>
            ))}
          </div>
        </div>
      </div>

      <p className="text text_type_main-medium">Выполнено за все время:</p>
      <h1
        className={`${styles["text_shadow"]} text text_type_digits-large mb-15`}
      >
        {ordersAll}
      </h1>

      <p className="text text_type_main-medium">Выполнено за сегодня:</p>
      <h1 className={`${styles["text_shadow"]} text text_type_digits-large`}>
        {ordersToday}
      </h1>
    </div>
  );
}

export function Orders() {
  let content = null;
  const { data, isLoading, error } = useGetOrdersQuery(
    "wss://norma.nomoreparties.space/orders/all"
  );

  if ((data && data.success === false) || isLoading) {
    content = <Loading text="Загружается история заказов" />;
  }

  if (error) {
    content = <Error text="Произошла ошибка при загрузке истории заказов" />;
  }

  if (data && data.orders.length > 1) {
    content = (
      <>
        <div className={styles["text-row"]}>
          <h1 className="text text_type_main-large">Лента заказов</h1>
        </div>

        <div className={styles["row"]}>
          <OrdersFeed orders={data.orders} key={"mobile-orders"} />
          <Stats
            orders={data.orders}
            ordersAll={data.total}
            ordersToday={data.totalToday}
            key={"mobile-stats"}
          />
        </div>
      </>
    );
  }

  return (
    <div key="feed" className={styles["container"]}>
      {content}
    </div>
  );
}
