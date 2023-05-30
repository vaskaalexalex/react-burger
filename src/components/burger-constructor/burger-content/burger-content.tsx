import { memo, useRef, FC } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import itemStyles from "../burger-item.module.css";
import { IIngredient } from "../../constants";

interface IBurgerContent {
  ingredient: IIngredient;
  draggable: boolean;
  index: number;
  bottomPadding: boolean;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  handleClose: () => void;
}

const BurgerContent: FC<IBurgerContent> = memo(
  ({ ingredient, draggable, index, bottomPadding, moveCard, handleClose }) => {
    const ref = useRef<HTMLDivElement>(null);
    const dropRef = useRef<HTMLDivElement>(null);
    const [{ isDrag }, drag, dragPreview] = useDrag({
      type: "sorting",
      item: ingredient,
      collect: (monitor) => ({
        isDrag: monitor.isDragging(),
      }),
    });

    const [{ handlerId }, drop] = useDrop<
      IIngredient,
      void,
      { handlerId: any }
    >({
      accept: "sorting",
      collect: (monitor) => ({
        handlerId: monitor.getHandlerId(),
      }),
      hover(item: IIngredient) {
        if (dropRef === undefined) {
          return;
        }
        if (!dropRef.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;

        if (hoverIndex === undefined) {
          return;
        }

        if (dragIndex === undefined) {
          return;
        }

        if (dragIndex === hoverIndex) {
          return;
        }

        if (moveCard) {
          moveCard(dragIndex, hoverIndex);
        }

        item.index = hoverIndex;
      },
    });

    drop(dropRef);
    drag(ref);
    dragPreview(dropRef);

    const opacity = isDrag ? 0 : 1;
    if (!ingredient) {
      return null;
    }

    return (
      <>
        <div
          className={`${itemStyles["ingredient"]} ${
            bottomPadding ? "mb-4" : ""
          }`}
          ref={dropRef}
          style={{ opacity }}
        >
          {draggable && (
            <div
              ref={ref}
              data-handler-id={handlerId}
              className={itemStyles["draggable"]}
            >
              <DragIcon type="primary" />
            </div>
          )}

          <div className={itemStyles["constructor-element"]}>
            <ConstructorElement
              text={ingredient.name}
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

export { BurgerContent };
