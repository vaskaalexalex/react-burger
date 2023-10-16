import { IngredientType } from "./components/constants";

interface IToken {
  exp: number;
  iat: number;
  id: string;
}

interface ITokenData {
  accessToken: string;
  refreshToken: string;
}

interface IUserData {
  email: string;
  name: string;
  password: string;
}

interface ILoginUser extends ITokenData {
  user: IUser;
}

interface IMessageData {
  message: string;
}

interface ISliceState {
  user: IUserData;
  tokens: ITokenData;
  status: string;
  success: string;
  error: string;
}

interface IRequestOptions {
  method: string;
  headers: {
    "Content-Type": string;
    authorization?: string;
  };
  body?: string;
}

export interface IIngredient {
  id: string;
  name: string;
  type: IngredientType.bun | IngredientType.main | IngredientType.sauce;
  fat: number;
  calories: number;
  carbohydrates: number;
  proteins: number;
  image: any;
  image_large: string;
  image_mobile: string;
  price: number;
  __v: number;
  _id: string;
  uniqueId: string;
  index?: number;
}

export interface IOrder {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  status: "created" | "pending" | "done";
  updatedAt: string;
  _id: string;
}

export interface IOrderResponse {
  name: string;
  order: { number: number };
  status: string;
}

interface Tab {
  _id: number;
  name: string;
  value: string;
  type: string;
}
