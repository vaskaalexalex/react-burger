import { memo, useMemo, FC } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

import itemStyles from "../burger-item.module.css";
import { IIngredient } from "../../constants";

interface BurgerConstructorItemTypes {
  ingredient: IIngredient;
  place?: string;
  handleClose: () => void;
}

const BurgerBunItem: FC<BurgerConstructorItemTypes> = memo(
  ({ ingredient, place, handleClose }) => {
    const bunName = useMemo(() => {
      switch (place) {
        case "top":
          return " (верх)";
        case "bottom":
          return " (низ)";
      }
    }, [place]);

    const bunType = useMemo(() => {
      switch (place) {
        case "top":
          return "top";
        case "bottom":
          return "bottom";
        default:
          return undefined;
      }
    }, [place]);

    return (
      <>
        <div className={itemStyles["ingredient-outer"]}>
          <div
            className={itemStyles["constructor-element"]}
            data-testid={bunType + ingredient._id}
          >
            <ConstructorElement
              isLocked
              type={bunType}
              text={ingredient.name + bunName}
              price={ingredient.price}
              thumbnail={ingredient.image}
              handleClose={handleClose}
            />
          </div>
        </div>
      </>
    );
  }
);

export { BurgerBunItem };
