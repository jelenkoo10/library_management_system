import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="mt-[250px] height-[300px] flex flex-col justify-between items-center">
      <h1 className="mb-10 text-white text-center text-4xl w-1/3">
        Pravo mesto za sve ljubitelje dobre knjige!
      </h1>
      <Link
        to="/login"
        className="px-3 py-2 text-white font-semibold text-2xl border-[#C75D2C] border-2 bg-[#A73D0C] opacity-80"
      >
        Pronađi knjigu
      </Link>
    </div>
  );
};

export default Homepage;
