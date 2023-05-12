import React from "react";
import useModal from "../hooks/modal-hook";
import Modal from "../components/UIElements/Modal";

let ModalContext;
let { Provider } = (ModalContext = React.createContext());

let ModalProvider = ({ children }) => {
  let { modal, handleModal, modalTitle, modalContent } = useModal();
  return (
    <Provider value={{ modal, handleModal, modalTitle, modalContent }}>
      <Modal />
      {children}
    </Provider>
  );
};

export { ModalContext, ModalProvider };
