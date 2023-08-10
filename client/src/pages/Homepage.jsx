import React from "react";
import { Link } from "react-router-dom";
import BookIcon from "../assets/icons8-book-100.png";
import PhoneIcon from "../assets/icons8-phone-100.png";

const Homepage = () => {
  return (
    <div className="min-h-[80vh]">
      <div className="py-[100px] flex flex-col items-center sm:px-6 h-1/2">
        <h1 className="mb-5 text-[#EEE] text-center font-bold text-4xl">
          Pravo mesto za sve ljubitelje dobre knjige!
        </h1>
        <p className="mb-10 text-white text-center text-2xl">
          Učlanite se u naš sistem biblioteka i steknite pristup stotinama
          knjiga koje čekaju na svoje čitaoce.
        </p>
        <Link
          to="/login"
          className="px-3 py-2 text-white font-semibold text-2xl border-[#C75D2C] border-2 bg-[#A73D0C] rounded-md hover:bg-[#C75D2C]"
        >
          Pronađi knjigu
        </Link>
      </div>
      <div className="bg-[#EEE] w-full opacity-70 sm:px-2 sm:py-6 lg:p-10 xl:p-16 h-1/2">
        <div className="md:w-[70%] lg:w-[59%] xl:w-[55%] flex items-center sm:mb-[60px] md:mb-[120px] text-xl">
          <p className="lg:w-[65%] xl:w-[77%] mx-4 font-semibold">
            Otkrijte svet knjiga uz našu raznovrsnu kolekciju naslova. Ispunite
            vaša slobodna vremena čitanjem naših inspirativnih i edukativnih
            naslova. Pogledajte naše bogate kategorije knjiga i pronađite
            savršeni naslov za sebe.
          </p>
          <img
            src={BookIcon}
            alt="An icon of the book"
            width="150px"
            height="150px"
          />
        </div>
        <div className="md:w-[70%] lg:w-[59%] xl:w-[55%] flex items-center sm:mt-[60px] md:mt-[120px] ml-auto text-xl text-right">
          <img
            src={PhoneIcon}
            alt="An icon of the phone"
            width="150px"
            height="150px"
          />
          <p className="lg:w-[65%] xl:w-[77%] mx-4 font-semibold">
            Sa nama je čitanje postalo jednostavnije nego ikad - pristupite
            našoj kolekciji knjiga sa bilo kog uređaja. Sada dostupno i za
            mobilne uređaje.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
