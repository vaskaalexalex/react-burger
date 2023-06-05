import overlayStyles from "./modal-overlay.module.css";

function ModalOverlay({ children }: { children: JSX.Element }) {
  return (
    <div key="modal-overlay" className={overlayStyles["modal-overlay"]}>
      {children}
    </div>
  );
}

export default ModalOverlay;
