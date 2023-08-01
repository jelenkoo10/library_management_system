import React from "react";
import { Link } from "react-router-dom";
import { ModalContext } from "../context/modal-context";

const Footer = () => {
  let { handleModal } = React.useContext(ModalContext);

  return (
    <footer className="p-3 bg-[#C75D23] opacity-80 w-full">
      <p className="text-center text-white font-bold text-lg">
        &copy; FIN 2023. Sva prava zadržana.
      </p>
      <div className="text-center text-white ml-2 mt-1 sm:flex sm:flex-col lg:flex-row lg:ml-0 lg:mx-auto lg:block">
        <span
          className="px-4 cursor-pointer"
          onClick={() => {
            handleModal(
              "Kako se učlaniti",
              <>
                <p>
                  Pritiskom na dugme{" "}
                  <a href="/signup" className="text-[#C75D23] font-bold">
                    Registruj se
                  </a>
                  , bićete odvedeni na stranicu za registraciju, na kojoj možete
                  popuniti svoje podatke, i odabrati ogranak u koji želite da se
                  učlanite.
                </p>
                <p>
                  Kada se registrujete, dobijate mogućnost da pregledate svoje
                  knjige, rezervacije i ogranke, i da rezervišete i preuzimate
                  knjige u određenoj biblioteci u kojoj ste učlanjeni.
                </p>
              </>
            );
          }}
        >
          Kako se učlaniti?
        </span>
        <span className="px-4 cursor-pointer lg:border-l-2 sm:border-0">
          <Link to="search">Pretraga knjiga</Link>
        </span>
        <span
          className="px-4 cursor-pointer lg:border-l-2 sm:border-0"
          onClick={() => {
            handleModal(
              "O kreatorima",
              <>
                <p>
                  Kreatori ove aplikacije su studenti 4. godine softverskog
                  inženjerstva, na Fakultetu inženjerskih nauka u Kragujevcu.
                  Aplikacija je kreirana u sklopu predmeta E-poslovanje.
                </p>
                <p>
                  Za više informacija o aplikaciji, ili eventualnom korišćenju,
                  kontaktirajte nas na nekom od sledećih linkova.
                </p>
                <div>
                  <a
                    className="block text-[#C75D2C]"
                    href="https://github.com/jelenkoo10"
                  >
                    Student 1 - Backend & Frontend
                  </a>
                  <a
                    className="block text-[#C75D2C]"
                    href="https://github.com/kila369"
                  >
                    Student 2 - Frontend
                  </a>
                  <a
                    className="block text-[#C75D2C]"
                    href="https://github.com/jovanzivadinovic"
                  >
                    Student 3 - Design
                  </a>
                </div>
              </>
            );
          }}
        >
          O kreatorima
        </span>
      </div>
    </footer>
  );
};

export default Footer;
