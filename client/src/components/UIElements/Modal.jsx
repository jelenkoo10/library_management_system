import React from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "../../context/modal-context";

const Modal = () => {
  let { modalTitle, modalContent, handleModal, modal } =
    React.useContext(ModalContext);

  if (modal) {
    return ReactDOM.createPortal(
      <div
        className="fixed top-0 left-0 h-screen w-full flex items-center justify-center"
        style={{ background: "rgba(0,0,0,0.8)" }}
      >
        <div className="bg-white relative p-5 shadow-lg rounded flex flex-col items-start text-lg text-gray-800 w-[600px]">
          <button
            className="absolute top-0 right-0 -mt-12 font-bold self-end rounded-full bg-[#C75D2C] mb-3 text-white w-8 h-8"
            onClick={() => handleModal()}
          >
            &times;
          </button>
          <h1 className="text-xl font-bold text-[#C75D2C] mb-5 text-center">
            {modalTitle}
          </h1>
          <div>{modalContent}</div>
        </div>
      </div>,
      document.querySelector("#modal-root")
    );
  }
};

export default Modal;
