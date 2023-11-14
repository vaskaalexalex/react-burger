import { useGetOrdersQuery } from "../../services/sockets/web-sockets";
import { Loading } from "../../components/loading/loading";
import { Error } from "../../components/error/error";
import { OrdersFeed, Stats } from "./components";
import styles from "./components/orders.module.css";

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
          <OrdersFeed orders={data.orders} />
          <Stats
            orders={data.orders}
            ordersAll={data.total}
            ordersToday={data.totalToday}
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
