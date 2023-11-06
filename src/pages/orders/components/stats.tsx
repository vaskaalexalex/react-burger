import { useMemo } from "react";
import styles from "./orders.module.css";
import { returnOrdersWithStatus } from "../../../utils";
import { IOrder } from "../../../types";

interface IStats {
  orders: IOrder[];
  ordersAll: number;
  ordersToday: number;
}

function Stats({ orders, ordersAll, ordersToday }: IStats) {
  const [doneOrders, createdOrders] = useMemo(() => {
    const done = returnOrdersWithStatus("done", orders);
    const created = returnOrdersWithStatus("pending", orders);
    return [done, created];
  }, [orders]);

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

export { Stats };
