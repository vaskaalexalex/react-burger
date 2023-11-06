import {
  IIngredient,
  ILoginUser,
  IMessageData,
  IOrder,
  IOrderResponse,
  IRequestOptions,
  ITokenData,
} from "../types";
import { setCookie } from "./utils";

export const BASE_URL = "https://norma.nomoreparties.space/api/";

const checkSuccess = async (res: Response) => {
  if (res.ok) {
    return await res.json();
  }
  throw new Error(`Response not successful: ${res.statusText}`);
};

const request = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  return checkSuccess(res);
};

export const getIngredients = (): Promise<IIngredient[]> =>
  request<{ data: IIngredient[] }>("ingredients").then(
    (response) => response.data
  );

export const addOrderRequest = (
  data: IRequestOptions
): Promise<IOrderResponse> => {
  return request<IOrderResponse>("orders", data);
};

export const createUser = async (
  requestOptions: IRequestOptions
): Promise<ILoginUser> => {
  const response = await request<ILoginUser>("auth/register", requestOptions);
  setCookie("accessToken", response.accessToken);
  setCookie("refreshToken", response.refreshToken);
  return response;
};

export const loginUser = async (
  requestOptions: IRequestOptions
): Promise<ILoginUser> => {
  const response = await request<ILoginUser>("auth/login", requestOptions);
  setCookie("accessToken", response.accessToken);
  setCookie("refreshToken", response.refreshToken);
  return response;
};

export const logoutUser = async (requestOptions: IRequestOptions) => {
  const response = await request<IMessageData>("auth/logout", requestOptions);
  setCookie("accessToken", "", { expires: 0 });
  setCookie("refreshToken", "", { expires: 0 });
  return response;
};

export const getUser = async (
  requestOptions: IRequestOptions
): Promise<ILoginUser> => {
  return request<ILoginUser>("auth/user", requestOptions);
};

export const updateUser = async (
  requestOptions: IRequestOptions
): Promise<ILoginUser> => {
  return request<ILoginUser>("auth/user", requestOptions);
};

export const getNewToken = async (
  requestOptions: IRequestOptions
): Promise<ITokenData> => {
  const response = await request<ITokenData>("auth/token", requestOptions);
  setCookie("accessToken", response.accessToken);
  setCookie("refreshToken", response.refreshToken);
  return response;
};

export const forgotPassword = async (
  requestOptions: IRequestOptions
): Promise<IMessageData> => {
  return request<IMessageData>("password-reset", requestOptions);
};

export const resetPassword = async (
  requestOptions: IRequestOptions
): Promise<IMessageData> => {
  return request<IMessageData>("password-reset/reset", requestOptions);
};

export const getOrder = async (number: number): Promise<IOrder[]> => {
  const response = await request(`orders/${number}`);
  const { orders } = response as { orders: IOrder[] };
  return orders;
};
