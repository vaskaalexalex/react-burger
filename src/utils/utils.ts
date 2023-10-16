import { IToken, IUserData } from "../types";
import jwtDecode from "jwt-decode";

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
export function setCookie(name: string, value: string, props?: any) {
  props = props || {};
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie + ";path=/";
}

export function validateInputField(input: string, name: string) {
  if (input.length === 0 || input === undefined) {
    return { isValid: false, error: `Поле не может быть пустым` };
  }
  switch (name) {
    case "name": {
      const regex = new RegExp("^[-a-zA-Zа-яА-Я0-9]+$");
      if (input.length <= 3) {
        return { isValid: false, error: "Минимальная длина имени - 4 символа" };
      }
      if (!regex.exec(input)) {
        return {
          isValid: false,
          error: "Имя не может содержать символы или пробелы",
        };
      }

      return { isValid: true, error: "" };
    }
    case "password": {
      const regex = new RegExp("  *");
      if (regex.exec(input)) {
        return { isValid: false, error: "Пароль не может содержать пробелы" };
      }
      if (input.length <= 7) {
        return {
          isValid: false,
          error: "Минимальная длина пароля - 8 символов",
        };
      }
    }
  }
  return { isValid: true, error: "" };
}

export function userAuthorized(user: IUserData) {
  return !(user.email === "" && user.name === "");
}

export function isTokenExpired(token: string): boolean {
  if (token === "") {
    return true;
  }
  const now = new Date();
  const expirationDate = jwtDecode<IToken>(token.split(" ")[1]).exp * 1000;
  return expirationDate - now.getTime() <= 0;
}

export function tokenExists(token: string): boolean {
  return token !== "";
}
