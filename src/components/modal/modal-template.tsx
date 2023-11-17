import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from "./modal-template.module.css";

type ModalProps = {
  children: JSX.Element;
  onClose: () => void;
  title?: string;
  titleIsNumber?: boolean;
};

const modalRoot = document.getElementById("modals")!;

const Modal = ({
  children,
  onClose,
  title = "",
  titleIsNumber,
}: ModalProps) => {
  useEffect(() => {
    const closeOnESC = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.addEventListener("keydown", closeOnESC);
    return () => {
      document.body.removeEventListener("keydown", closeOnESC);
    };
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <ModalOverlay onClose={handleOverlayClick}>
      <div className={modalStyles.modal}>
        <div
          className={`${modalStyles["modal-header"]} text text_type_main-medium`}
        >
          <p
            className={`${modalStyles["modal-title"]}
                ${
                  titleIsNumber
                    ? "text text_type_digits-default"
                    : "text text_type_main-medium"
                }
              `}
          >
            {title}
          </p>
          <div
            className={modalStyles["close-icon"]}
            onClick={onClose}
            data-testid="modal-close-icon"
          >
            <CloseIcon type="primary" />
          </div>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

export { Modal };
