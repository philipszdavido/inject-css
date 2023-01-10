import "./Modal.css";

const Modal = ({ children, closeFn }) => {
  return (
    <div className="modal">
      <div className="modal-header">
        <span>Presets</span>
        <span onClick={closeFn}>X</span>
      </div>
      <div className="modal-body">{children}</div>
    </div>
  );
};

export default Modal;
