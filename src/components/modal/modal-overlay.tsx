import overlayStyles from "./modal-overlay.module.css";

function ModalOverlay({
  onClose,
  children,
}: {
  onClose: () => void;
  children: JSX.Element;
}) {
  return (
    <div
      key="modal-overlay"
      className={overlayStyles["modal-overlay"]}
      onClick={onClose}
    >
      {children}
    </div>
  );
}

export default ModalOverlay;
