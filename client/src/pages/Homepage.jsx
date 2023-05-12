import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="mt-[200px] height-[300px] flex flex-col justify-between items-center">
      <h1 className="mb-5 text-[#EEE] text-center font-bold text-4xl">
        Pravo mesto za sve ljubitelje dobre knjige!
      </h1>
      <p className="mb-10 text-white text-center text-2xl">
        Učlanite se u naš sistem biblioteka i steknite pristup stotinama knjiga
        koje čekaju na svoje čitaoce.
      </p>
      <Link
        to="/login"
        className="px-3 py-2 text-white font-semibold text-2xl border-[#C75D2C] border-2 bg-[#A73D0C] rounded-md hover:bg-[#C75D2C]"
      >
        Pronađi knjigu
      </Link>
    </div>
  );
};

export default Homepage;
