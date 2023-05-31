import { IIngredient } from "../components/constants";

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

export const addOrderRequest = async (data: any) => {
  try {
    const response = await fetch(`${BASE_URL}orders`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
