import { IIngredient, IOrder, IToken, IUserData } from "../types";
import jwtDecode from "jwt-decode";

import { v4 as uuidv4 } from "uuid";

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

export function declOfNum(n: number, text_forms: string[]) {
  n = Math.abs(n) % 100;
  var n1 = n % 10;
  if (n > 10 && n < 20) {
    return text_forms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return text_forms[1];
  }
  if (n1 === 1) {
    return text_forms[0];
  }
  return text_forms[2];
}

export const formatDisplayDate = (date: string): string => {
  const orderDate = new Date(date).setHours(0, 0, 0, 0);
  const currentDate = new Date().setHours(0, 0, 0, 0);

  const daysSinceDate = Math.floor(
    Math.abs(currentDate - orderDate) / 86400000
  );

  let day = new Date(orderDate).toLocaleDateString("ru-RU", {});
  if (daysSinceDate < 1) {
    day = "Сегодня";
  } else if (daysSinceDate === 1) {
    day = "Вчера";
  } else {
    day = `${daysSinceDate} ${declOfNum(daysSinceDate, [
      "день",
      "дня",
      "дней",
    ])} назад`;
  }
  const time = new Date(date).toLocaleTimeString("ru-Ru", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
  return `${day}, ${time}`;
};

interface IIngredientWithAmount extends IIngredient {
  amount: number;
}
interface IElem {
  name: number;
  [key: string]: number;
}

export function generateIngredientsWithAmount(
  allIngredients: Array<IIngredient>,
  receivedIngredients: Array<string>
): Array<IIngredientWithAmount> {
  const uniq = receivedIngredients
    .map((name) => {
      return {
        count: 1,
        id: name,
      };
    })
    .reduce<IElem>((result, b) => {
      result[b.id] = (result[b.id] || 0) + b.count;
      return result;
    }, {} as IElem);

  return Object.keys(uniq).map((key) => {
    const foundIngredient = allIngredients.filter(
      (item) => item._id === key
    )[0];

    return {
      ...foundIngredient,
      _uniqueId: uuidv4(),
      amount: foundIngredient.type === "bun" ? uniq[key] * 2 : uniq[key],
    };
  });
}

export function getTotalPriceOfIngredientsWithAmount(
  ingredients: Array<IIngredientWithAmount>
): number {
  return ingredients.reduce((acc, obj) => {
    return acc + obj.price * obj.amount;
  }, 0);
}

export function generateIngredientsFromIds(
  allIngredients: Array<IIngredient>,
  receivedIngredients: Array<string>
): Array<IIngredient> {
  const validIngredients = receivedIngredients.filter((item) => item != null);
  return validIngredients.map((ingredient) => {
    const foundIngredient = allIngredients.filter(
      (item) => item._id === ingredient
    )[0];

    return { ...foundIngredient, _uniqueId: uuidv4() };
  });
}

export function getTotalPriceOfIngredients(
  ingredients: Array<IIngredient>
): number {
  return ingredients.reduce(
    (acc, obj) => acc + (obj.type === "bun" ? obj.price * 2 : obj.price),
    0
  );
}

export function returnOrdersWithStatus(
  status: string,
  orders: IOrder[]
): IOrder[] {
  return orders.filter((order) => order.status === status);
}
