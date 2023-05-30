import { IIngredient } from "../components/constants";

const BURGER_API_URL = "https://norma.nomoreparties.space/api";

const checkResponse = (res: Response): Promise<any> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const checkSuccess = (
  data: { success: string; data: any },
  returnData: any
) => {
  return data.success
    ? returnData
    : () => {
        throw new Error("Апи не работает");
      };
};

export const getIngredients = async (): Promise<IIngredient[]> => {
  const res = await fetch(`${BURGER_API_URL}/ingredients`);
  const data = await checkResponse(res);
  return checkSuccess(data, data.data);
};

export const addOrderRequest = async (data: any) => {
  try {
    const response = await fetch(`${BURGER_API_URL}/orders`, {
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
