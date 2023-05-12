import React from "react";
import { Link } from "react-router-dom";
import { ModalContext } from "../context/modal-context";

const Footer = () => {
  let { handleModal } = React.useContext(ModalContext);

  return (
    <footer className="p-3 bg-[#C75D23] opacity-80 absolute bottom-0 left-0 right-0">
      <p className="text-center text-white font-bold text-lg">
        &copy; FIN 2023. Sva prava zadržana.
      </p>
      <div className="text-center text-white ml-2 mt-1">
        <span
          className="px-4 cursor-pointer"
          onClick={() => {
            handleModal(
              "Kako se učlaniti",
              <p>
                Pritiskom na dugme{" "}
                <a href="/signup" className="text-[#C75D23] font-bold">
                  Registruj se
                </a>
                , bićete odvedeni na stranicu za registraciju, na kojoj možete
                popuniti svoje podatke, i odabrati ogranak u koji želite da se
                učlanite.
              </p>
            );
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
            handleModal("O kreatorima", "sadržaj");
          }}
        >
          O kreatorima
        </span>
      </div>
    </footer>
  );
};

export default Footer;
