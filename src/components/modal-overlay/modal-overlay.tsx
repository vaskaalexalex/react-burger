import overlayStyles from "./modal-overlay.module.css";
import React, { MouseEventHandler } from "react";

function ModalOverlay({
  onClose,
  children,
}: {
  onClose: MouseEventHandler<HTMLDivElement>;
  children: JSX.Element;
}) {
  return (
    <div
      onClick={onClose}
      key="modal-overlay"
      className={overlayStyles["modal-overlay"]}
    >
      {children}
    </div>
  );
}

export default ModalOverlay;
