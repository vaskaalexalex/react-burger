import { useRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useAppSelector } from "../../services/hooks";
import { Error } from "../../components/error/error";
import { useGetOrdersQuery } from "../../services/sockets/web-sockets";

import styles from "./profile-orders.module.css";
import { Loading } from "../../components/loading/loading";
import { InfinityScroll } from "../../components/infinity-scroll/infinity-scroll";

const setActive = (
  { isActive }: { isActive: boolean },
  additionalClass: String
) =>
  "text text_type_main-default " +
  (isActive ? "" : "text_color_inactive ") +
  additionalClass;

export function ProfileOrders() {
  const ordersRef = useRef<HTMLDivElement>(null);
  const [ordersHeight, setOrdersHeight] = useState(0);

  useEffect(() => {
    setOrdersHeight(ordersRef?.current?.clientHeight ?? 0);
  }, []);

  let content = null;

  const { tokens } = useAppSelector((state) => state.authUser);

  const { data, isLoading, error } = useGetOrdersQuery(
    `wss://norma.nomoreparties.space/orders?token=${
      tokens.accessToken?.split(" ")[1]
    }`
  );

  if ((data && data.success === false) || isLoading || ordersHeight === 0) {
    content = <Loading text="Загружается история заказов" />;
  }

  if (error) {
    content = (
      <Error text={`Произошла ошибка при загрузке истории заказов: ${error}`} />
    );
  }

  if (data && data.orders.length >= 1 && ordersHeight > 0) {
    content = (
      <InfinityScroll
        orders={data.orders.slice(0).reverse()}
        height={ordersHeight}
      />
    );
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["profile-container"]}>
        <div className={`${styles["profile-items-container"]} mt-30 mr-15`}>
          <NavLink
            to={"/profile"}
            className={(isActive) => setActive(isActive, "mb-6")}
            end
          >
            Профиль
          </NavLink>
          <NavLink
            to={"/profile/orders"}
            className={(isActive) => setActive(isActive, "mb-6")}
          >
            История заказов
          </NavLink>
          <NavLink
            to={"/logout"}
            className={(isActive) => setActive(isActive, "mb-20")}
          >
            Выход
          </NavLink>
          <p className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете просмотреть свою историю заказов
          </p>
        </div>
        <div className={styles["orders-container"]} ref={ordersRef}>
          {content}
        </div>
      </div>
    </div>
  );
}
