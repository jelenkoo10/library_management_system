import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./UIElements/Modal";

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const [whichModal, setWhichModal] = useState("");

  const handleOnClose = () => {
    setShowModal(false);
  };

  return (
    <footer className="p-3 bg-[#C75D23] opacity-80 absolute bottom-0 left-0 right-0">
      <p className="text-center text-white font-bold text-lg">
        &copy; FIN 2023. Sva prava zadržana.
      </p>
      <div className="text-center text-white ml-2 mt-1">
        <span
          className="px-4 cursor-pointer"
          onClick={() => {
            setShowModal(true);
            setWhichModal("signup");
          }}
        >
          Kako se učlaniti?
        </span>
        <span className="px-4 cursor-pointer border-l-2">
          <Link to="search">Pretraga knjiga</Link>
        </span>
        <span
          className="px-4 cursor-pointer border-l-2"
          onClick={() => {
            setShowModal(true);
            setWhichModal("creators");
          }}
        >
          O kreatorima
        </span>
      </div>
      {whichModal == "signup" ? (
        <Modal
          onClose={handleOnClose}
          visible={showModal}
          modalTitle="Kako se učlaniti?"
          modalContent={
            <p>
              Pritiskom na dugme{" "}
              <Link
                to="/signup"
                onClick={handleOnClose}
                className="text-[#C75D23] font-bold"
              >
                Registruj se
              </Link>
              , bićete odvedeni na stranicu za registraciju, na kojoj možete
              popuniti svoje podatke, i odabrati ogranak u koji želite da se
              učlanite.
            </p>
          }
        />
      ) : whichModal == "creators" ? (
        <Modal
          onClose={handleOnClose}
          visible={showModal}
          modalTitle="O kreatorima"
          modalContent={
            <p>
              Pritiskom na dugme{" "}
              <Link
                to="/signup"
                onClick={handleOnClose}
                className="text-[#C75D23] font-bold"
              >
                Registruj se
              </Link>
              , bićete odvedeni na stranicu za registraciju, na kojoj možete
              popuniti svoje podatke, i odabrati ogranak u koji želite da se
              učlanite.
            </p>
          }
        />
      ) : (
        <div></div>
      )}
    </footer>
  );
};

export default Footer;
