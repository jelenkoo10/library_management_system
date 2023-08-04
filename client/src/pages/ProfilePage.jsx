import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const ProfilePage = () => {
  const [currentPage, setCurrentPage] = useState(null);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (window.location.href.includes("reservations")) {
      setCurrentPage("reservations");
    } else if (window.location.href.includes("libraries")) {
      setCurrentPage("libraries");
    } else if (window.location.href.includes("update")) {
      setCurrentPage("update");
    } else if (window.location.href.includes("favorites")) {
      setCurrentPage("favorites");
    } else if (window.location.href.includes("recommendations")) {
      setCurrentPage("recommendations");
    } else {
      setCurrentPage("books");
    }
  }, [isChanged]);

  return (
    <div className="flex mt-6 ml-20 sm:m-4 sm:flex-col lg:w-[1120px] xl:w-[1320px] lg:mx-auto lg:flex-row lg:justify-start">
      <nav className="flex flex-col text-[#C75D2C] text-xl font-bold sm:grid sm:grid-cols-3 sm:justify-center sm:text-md lg:flex lg:flex-col lg:justify-start">
        <NavLink
          className={`border border-[#C75D2C] xl:p-8 sm:p-2 lg:w-[220px] lg:py-4 xl:w-full bg-[#DDD] ${
            currentPage == "books" ? "underline" : ""
          }`}
          onClick={() => setIsChanged((prev) => !prev)}
          to="."
        >
          Moje knjige
        </NavLink>
        <NavLink
          className={`border border-[#C75D2C] xl:p-8 sm:p-2 lg:w-[220px] lg:py-4 xl:w-full bg-[#DDD] ${
            currentPage == "reservations" ? "underline" : ""
          }`}
          onClick={() => setIsChanged((prev) => !prev)}
          to="reservations"
        >
          Moje rezervacije
        </NavLink>
        <NavLink
          className={`border border-[#C75D2C] xl:p-8 sm:p-2 lg:w-[220px] lg:py-4 xl:w-full bg-[#DDD] ${
            currentPage == "libraries" ? "underline" : ""
          }`}
          onClick={() => setIsChanged((prev) => !prev)}
          to="libraries"
        >
          Moje biblioteke
        </NavLink>
        <NavLink
          className={`border border-[#C75D2C] xl:p-8 sm:p-2 lg:w-[220px] lg:py-4 xl:w-full bg-[#DDD] ${
            currentPage == "favorites" ? "underline" : ""
          }`}
          onClick={() => setIsChanged((prev) => !prev)}
          to="favorites"
        >
          Moje omiljene knjige
        </NavLink>
        <NavLink
          className={`border border-[#C75D2C] xl:p-8 sm:p-2 lg:w-[220px] lg:py-4 xl:w-full bg-[#DDD] ${
            currentPage == "recommendations" ? "underline" : ""
          }`}
          onClick={() => setIsChanged((prev) => !prev)}
          to="recommendations"
        >
          Preporuke
        </NavLink>
        <NavLink
          className={`border border-[#C75D2C] xl:p-8 sm:p-2 lg:w-[220px] lg:py-4 xl:w-full bg-[#DDD] ${
            currentPage == "update" ? "underline" : ""
          }`}
          onClick={() => setIsChanged((prev) => !prev)}
          to="update"
        >
          Ažuriraj profil
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default ProfilePage;
