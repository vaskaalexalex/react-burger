import React from "react";
import { NavLink } from "react-router-dom";

import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./nav-link.module.css";

export const setActiveHelper = (
  isActive: boolean,
  activeStyle: string,
  inActiveStyle: string
) => (isActive ? activeStyle : inActiveStyle);

export const iconTypeHelper = (
  link: string,
  active: string,
  activeStyle: "secondary" | "primary" | "error" | "success",
  inActiveStyle: "secondary" | "primary" | "error" | "success",
  end?: boolean
) => {
  if (
    active === link ||
    (!end && active.includes(link) && active.charAt(link.length) === "/")
  )
    return activeStyle;
  return inActiveStyle;
};

type NavLinkProps = {
  url: string;
  pathname: string;
  text: string;
  iconType: "home" | "feed" | "profile";
  end?: boolean;
  onClick?: () => void;
};

export function NavLinkWithIcon({
  url,
  pathname,
  text,
  iconType,
  end,
  onClick,
}: NavLinkProps) {
  let Icon = <></>;

  switch (iconType) {
    case "home":
      Icon = (
        <BurgerIcon
          type={iconTypeHelper(url, pathname, "primary", "secondary", end)}
        />
      );
      break;
    case "feed":
      Icon = (
        <ListIcon
          type={iconTypeHelper(url, pathname, "primary", "secondary", end)}
        />
      );
      break;
    case "profile":
      Icon = (
        <ProfileIcon
          type={iconTypeHelper(url, pathname, "primary", "secondary", end)}
        />
      );
      break;
  }

  return (
    <>
      <NavLink
        className={({ isActive }) =>
          `${styles["item"]} text text_type_main-default ${setActiveHelper(
            isActive,
            styles["menu__item_active"],
            styles["menu__item"]
          )}`
        }
        to={url}
        state={{ from: pathname }}
        onClick={onClick}
        end
      >
        {text}
        {Icon}
      </NavLink>
    </>
  );
}
