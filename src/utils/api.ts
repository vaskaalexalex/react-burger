import {
  ILoginUser,
  IRequestOptions,
  IIngredient,
  IMessageData,
  ITokenData,
} from "../types";
import { setCookie } from "./utils";

export const BASE_URL = "https://norma.nomoreparties.space/api/";

interface ErrorResponse {
  message: string;
}

const checkResponse = async <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  }
  const error: ErrorResponse = await res.json();
  throw new Error(`Request failed with status ${res.status}: ${error.message}`);
};

const checkSuccess = (res: any) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

const request = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  const data = await checkResponse<T>(response);
  return checkSuccess(data);
};

export const getIngredients = (): Promise<IIngredient[]> =>
  request<{ data: IIngredient[] }>("ingredients").then(
    (response) => response.data
  );

export const addOrderRequest = (data: any): any => {
  console.log(data);
  const requestParams = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  request<any>("orders", requestParams).then((response) => response.data);
};

export const createUser = async (
  requestOptions: IRequestOptions
): Promise<ILoginUser> => {
  const res = await fetch(`${BASE_URL}auth/register`, requestOptions);
  const data = await checkResponse(res);
  const success: ILoginUser = checkSuccess(data);
  if (success) {
    setCookie("accessToken", success.accessToken);
    setCookie("refreshToken", success.refreshToken);
  }
  return success;
};

export const loginUser = async (
  requestOptions: IRequestOptions
): Promise<ILoginUser> => {
  const res = await fetch(`${BASE_URL}auth/login`, requestOptions);
  const data = await checkResponse(res);
  const success: ILoginUser = checkSuccess(data);
  if (success) {
    setCookie("accessToken", success.accessToken);
    setCookie("refreshToken", success.refreshToken);
  }
  return success;
};

export const logoutUser = async (requestOptions: IRequestOptions) => {
  const res = await fetch(`${BASE_URL}auth/logout`, requestOptions);
  const data = await checkResponse(res);
  const success: IMessageData = checkSuccess(data);
  if (success) {
    setCookie("accessToken", "", {
      expires: 0,
    });
    setCookie("refreshToken", "", {
      expires: 0,
    });
  }
  return success;
};

export const getUser = async (
  requestOptions: IRequestOptions
): Promise<ILoginUser> => {
  const res = await fetch(`${BASE_URL}auth/user`, requestOptions);
  const data = await checkResponse(res);
  return checkSuccess(data);
};

export const updateUser = async (
  requestOptions: IRequestOptions
): Promise<ILoginUser> => {
  const res = await fetch(`${BASE_URL}auth/user`, requestOptions);
  const data = await checkResponse(res);
  return checkSuccess(data);
};

export const getNewToken = async (
  requestOptions: IRequestOptions
): Promise<ITokenData> => {
  const res = await fetch(`${BASE_URL}auth/token`, requestOptions);
  const data = await checkResponse(res);
  const success = checkSuccess(data);
  if (success) {
    setCookie("accessToken", success.accessToken);
    setCookie("refreshToken", success.refreshToken);
  }
  return success;
};

export const forgotPassword = async (
  requestOptions: IRequestOptions
): Promise<IMessageData> => {
  const res = await fetch(`${BASE_URL}password-reset`, requestOptions);
  const data = await checkResponse(res);
  return checkSuccess(data);
};

export const resetPassword = async (
  requestOptions: IRequestOptions
): Promise<IMessageData> => {
  const res = await fetch(`${BASE_URL}password-reset/reset`, requestOptions);
  const data = await checkResponse(res);
  return checkSuccess(data);
};
