import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from "./modal-template.module.css";

type ModalProps = {
  children: JSX.Element;
  onClose: () => void;
  title: string;
};

const Modal = ({ children, onClose, title = "" }: ModalProps) => {
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

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={modalStyles.modal}>
        <div
          className={`${modalStyles["modal-header"]} text text_type_main-medium`}
        >
          {title}
          <div className={modalStyles["close-icon"]}>
            <CloseIcon type="primary" />
          </div>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </ModalOverlay>,
    document.body
  );
};

export default Modal;
