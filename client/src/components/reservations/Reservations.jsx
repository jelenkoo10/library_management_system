import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Reservations = () => {
  return (
    <div>
      <nav className="flex text-[#C75D2C] text-lg font-semibold mt-[-45px]">
        <NavLink className="border border-[#C75D2C] px-5 py-2 bg-[#DDD]" to=".">
          Trenutne rezervacije
        </NavLink>
        <NavLink
          className="border border-[#C75D2C] px-5 py-2 bg-[#DDD]"
          to="filter"
        >
          Filter rezervacija
        </NavLink>
        <NavLink
          className="border border-[#C75D2C] px-5 py-2 bg-[#DDD]"
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
