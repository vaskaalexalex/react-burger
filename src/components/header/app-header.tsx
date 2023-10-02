import { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLinkWithIcon } from "./nav-link/nav-link";
import { useAppSelector } from "../../services/hooks";
import { userAuthorized } from "../../utils";

import styles from "./app-header.module.css";

export function AppHeader() {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.authUser);
  const authorized = useMemo(() => userAuthorized(user), [user]);

  return (
    <>
      <header className={styles["header"]}>
        <nav className={styles["header-inner"]}>
          <ul className={`${styles["menu-left"]} mb-4 mt-4`}>
            <li className={`${styles["menu__item"]} mr-5 mb-5 mt-5`}>
              <NavLinkWithIcon
                url="/"
                pathname={location.pathname}
                text="Конструктор"
                iconType="home"
              />
            </li>
            <li className={`${styles["menu__item"]} ml-5 mr-5 mb-5 mt-5`}>
              <NavLinkWithIcon
                url="/feed"
                pathname={location.pathname}
                text="Лента заказов"
                iconType="feed"
              />
            </li>
          </ul>
          <div className={styles["logo"]}>
            <NavLink to="/" state={{ from: location }}>
              <Logo />
            </NavLink>
          </div>
          <ul className={`${styles["menu-right"]} mb-4 mt-4`}>
            <li className={`${styles["menu__item"]} mr-5 mb-5 mt-5`}>
              {authorized ? (
                <NavLinkWithIcon
                  url="/profile"
                  pathname={location.pathname}
                  text="Личный кабинет"
                  iconType="profile"
                />
              ) : (
                <NavLinkWithIcon
                  url="/login"
                  pathname={location.pathname}
                  text="Войти"
                  iconType="profile"
                />
              )}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
