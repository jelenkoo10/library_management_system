import React from "react";
import { useHttpClient } from "./http-hook";

export default () => {
  let [modal, setModal] = React.useState(false);
  let [modalContent, setModalContent] = React.useState(
    "Uneti email i lozinka nisu ispravni. Pokušajte ponovo!"
  );
  let [modalTitle, setModalTitle] = React.useState("I'm the Modal Title");
  const { clearError } = useHttpClient();

  let handleModal = (title = false, content = false) => {
    clearError();
    setModal((prevModal) => !prevModal);
    if (content) {
      setModalContent(content);
    }
    if (title) {
      setModalTitle(title);
    }
  };

  return { modal, handleModal, modalTitle, modalContent };
};
