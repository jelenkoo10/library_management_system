import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="mt-[250px] height-[300px] flex flex-col justify-between items-center">
      <h1 className="mb-10 text-white text-center text-4xl w-1/3">
        Ups! Ova stranica ne postoji.
      </h1>
      <Link
        to="/"
        className="px-3 py-2 text-white font-semibold text-2xl border-[#C75D2C] border-2 bg-[#A73D0C] opacity-80"
      >
        Vratite se na početnu stranu
      </Link>
    </div>
  );
};

export default NotFound;
