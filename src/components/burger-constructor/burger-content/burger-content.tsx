import { memo, useRef, FC } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import itemStyles from "../burger-item.module.css";
import { IIngredient } from "../../../types";

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
      item: { id: ingredient._id, index },
      collect: (monitor) => ({
        isDrag: monitor.isDragging(),
      }),
    });

    const [{ handlerId }, drop] = useDrop<
      { id: string; index: number },
      void,
      { handlerId: string; isOver: boolean }
    >({
      accept: "sorting",
      collect: (monitor) => ({
        handlerId: monitor.getHandlerId() as string,
        isOver: monitor.isOver(),
      }),
      hover(item: { id: string; index: number }, monitor) {
        if (dropRef.current) {
          const hoverIndex = index;
          const dragIndex = item.index;

          if (dragIndex === hoverIndex) {
            return;
          }

          const hoverBoundingRect = dropRef.current.getBoundingClientRect();

          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

          const clientOffset = monitor.getClientOffset();

          if (!clientOffset) {
            return;
          }

          const hoverClientY = clientOffset.y - hoverBoundingRect.top;

          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
          }

          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
          }

          if (moveCard) {
            moveCard(dragIndex, hoverIndex);
          }

          item.index = hoverIndex;
        }
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
          data-testid={"inner" + ingredient._id}
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
