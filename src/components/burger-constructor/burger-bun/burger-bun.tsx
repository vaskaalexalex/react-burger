import { memo, useMemo, FC } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "../burger-item.module.css";
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
        <div className={styles["ingredient-outer"] + " noselect"}>
          <div
            className={styles["constructor-element-wrapper"]}
            data-testid={bunType + ingredient._id}
          >
            <ConstructorElement
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
