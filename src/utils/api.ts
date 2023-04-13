const BURGER_API_URL = "https://norma.nomoreparties.space/api";

const checkResponse = (res: Response): Promise<any> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
export async function fetchIngredients() {
  try {
    const response = await fetch(`${BURGER_API_URL}/ingredients`);
    return await checkResponse(response);
  } catch (error) {
    console.log(error);
  }
}
