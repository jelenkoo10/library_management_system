import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";

const Reservations = () => {
  const [currentPage, setCurrentPage] = useState(null);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (window.location.href.includes("history")) {
      setCurrentPage("history");
    } else {
      setCurrentPage("reservations");
    }
  }, [isChanged]);

  return (
    <div>
      <nav className="flex text-[#C75D2C] text-lg font-semibold mt-[-45px]">
        <NavLink
          className={`border border-[#C75D2C] px-5 py-2 bg-[#DDD] ${
            currentPage == "reservations" ? "font-bold" : ""
          }`}
          onClick={() => setIsChanged((prev) => !prev)}
          to="."
        >
          Trenutne rezervacije
        </NavLink>
        <NavLink
          className={`border border-[#C75D2C] px-5 py-2 bg-[#DDD] ${
            currentPage == "history" ? "font-bold" : ""
          }`}
          onClick={() => setIsChanged((prev) => !prev)}
          to="history"
        >
          Istorija rezervacija
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default Reservations;
