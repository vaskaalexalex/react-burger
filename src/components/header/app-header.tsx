import React from "react";
import {
  BurgerIcon,
  Logo,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./app-header.module.css";

const AppHeader = () => {
  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles["header-inner"]}>
        <ul className={`${headerStyles["menu-left"]} mb-4 mt-4`}>
          <li className={`${headerStyles["menu-item"]} mr-5 mb-5 mt-5`}>
            <BurgerIcon type="primary" />
            <a className="text text_type_main-default ml-2">Конструктор</a>
          </li>
          <li className={`${headerStyles["menu-item"]} mr-5 mb-5 mt-5`}>
            <ListIcon type="secondary" />
            <a className="text text_type_main-default text_color_inactive ml-2">
              Лента заказов
            </a>
          </li>
        </ul>
        <div className={headerStyles.logo}>
          <Logo />
        </div>
        <ul className={`${headerStyles["menu-right"]} mb-4 mt-4`}>
          <li className={`${headerStyles["menu-item"]} mr-5 mb-5 mt-5`}>
            <ProfileIcon type="secondary" />
            <a className="text text_type_main-default text_color_inactive ml-2">
              Личный кабинет
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
