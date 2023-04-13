import React from "react";
import {
  BurgerIcon,
  Logo,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./app-header.module.css";

const AppHeader = (): JSX.Element => {
  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles["header-inner"]}>
        <ul className={`${headerStyles["menu-left"]} mb-4 mt-4`}>
          <li className={`${headerStyles["menu-item"]} mr-5 mb-5 mt-5`}>
            <a
              href="#"
              className="text text_type_main-default text_color_primary ml-2"
            >
              <BurgerIcon type="primary" />
              <div className="text text_type_main-default text_color_active ml-2">
                Конструктор
              </div>
            </a>
          </li>
          <li className={`${headerStyles["menu-item"]} mr-5 mb-5 mt-5`}>
            <a href="#">
              <ListIcon type="secondary" />
              <div className="text text_type_main-default text_color_inactive ml-2">
                Лента заказов
              </div>
            </a>
          </li>
        </ul>
        <div className={headerStyles.logo}>
          <Logo />
        </div>
        <ul className={`${headerStyles["menu-right"]} mb-4 mt-4`}>
          <li className={`${headerStyles["menu-item"]} mr-5 mb-5 mt-5`}>
            <a
              href="#"
              className="text text_type_main-default text_color_inactive ml-2 ,"
            >
              <ProfileIcon type="secondary" />
              <div className="text text_type_main-default text_color_inactive ml-2">
                Личный кабинет
              </div>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
