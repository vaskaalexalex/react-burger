import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";

interface ICounter {
  count: number;
}

function IngredientCounter({ count }: ICounter) {
  return <>{count && <Counter count={count} size="default" />}</>;
}

export { IngredientCounter };
