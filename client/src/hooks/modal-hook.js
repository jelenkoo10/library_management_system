import React from "react";

export default () => {
  let [modal, setModal] = React.useState(false);
  let [modalContent, setModalContent] = React.useState(
    "Uneti email i lozinka nisu ispravni. Pokušajte ponovo!"
  );
  let [modalTitle, setModalTitle] = React.useState("I'm the Modal Title");

  let handleModal = (title = false, content = false) => {
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
