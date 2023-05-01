import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const ProfilePage = () => {
  return (
    <div className="flex">
      <nav className="flex flex-column">
        <NavLink to=".">Moje knjige</NavLink>
        <NavLink to="/update">Ažuriraj profil</NavLink>
        <NavLink to="/reservations">Moje rezervacije</NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default ProfilePage;
