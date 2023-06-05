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
    <div className="flex mt-6 ml-20">
      <nav className="flex flex-col text-[#C75D2C] text-xl font-bold">
        <NavLink
          className={`border border-[#C75D2C] p-8 bg-[#DDD] ${
            currentPage == "books" ? "underline" : ""
          }`}
          onClick={() => setIsChanged((prev) => !prev)}
          to="."
        >
          Moje knjige
        </NavLink>
        <NavLink
          className={`border border-[#C75D2C] p-8 bg-[#DDD] ${
            currentPage == "reservations" ? "underline" : ""
          }`}
          onClick={() => setIsChanged((prev) => !prev)}
          to="reservations"
        >
          Moje rezervacije
        </NavLink>
        <NavLink
          className={`border border-[#C75D2C] p-8 bg-[#DDD] ${
            currentPage == "libraries" ? "underline" : ""
          }`}
          onClick={() => setIsChanged((prev) => !prev)}
          to="libraries"
        >
          Moje biblioteke
        </NavLink>
        <NavLink
          className={`border border-[#C75D2C] p-8 bg-[#DDD] ${
            currentPage == "favorites" ? "underline" : ""
          }`}
          onClick={() => setIsChanged((prev) => !prev)}
          to="favorites"
        >
          Moje omiljene knjige
        </NavLink>
        <NavLink
          className={`border border-[#C75D2C] p-8 bg-[#DDD] ${
            currentPage == "recommendations" ? "underline" : ""
          }`}
          onClick={() => setIsChanged((prev) => !prev)}
          to="recommendations"
        >
          Preporuke
        </NavLink>
        <NavLink
          className={`border border-[#C75D2C] p-8 bg-[#DDD] ${
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
