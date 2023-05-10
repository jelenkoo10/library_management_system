import React from "react";

const Modal = (props) => {
  const { visible, onClose, modalTitle, modalContent } = props;

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 blackdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-4 rounded-md w-[500px]">
        <button className="ml-auto block mb-2" onClick={onClose}>
          X
        </button>
        <h1 className="text-xl font-bold text-[#C75D2C] mb-5 text-center">
          {modalTitle}
        </h1>
        <div>{modalContent}</div>
      </div>
    </div>
  );
};

export default Modal;
