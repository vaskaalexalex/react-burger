const BURGER_API_URL = "https://norma.nomoreparties.space/api";

export async function fetchIngredients() {
  try {
    const response = await fetch(`${BURGER_API_URL}/ingredients`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
