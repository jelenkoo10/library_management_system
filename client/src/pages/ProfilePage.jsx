import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const ProfilePage = () => {
  return (
    <div className="flex mt-20 ml-20 items-center">
      <nav className="flex flex-col text-[#C75D2C] text-xl font-bold">
        <NavLink className="border border-[#C75D2C] p-10 bg-[#DDD]" to=".">
          Moje knjige
        </NavLink>
        <NavLink
          className="border border-[#C75D2C] p-10 bg-[#DDD]"
          to="reservations"
        >
          Moje rezervacije
        </NavLink>
        <NavLink className="border border-[#C75D2C] p-10 bg-[#DDD]" to="update">
          Ažuriraj profil
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default ProfilePage;
