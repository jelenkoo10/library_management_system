import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import Button from "./UIElements/Button";
import ProfileCard from "../assets/profile_card.png";

const Navbar = () => {
  const auth = useContext(AuthContext);
  const userData = auth.isLoggedIn
    ? JSON.parse(localStorage.getItem("userData"))
    : null;
  const navigate = useNavigate();

  return (
    <>
      {auth.isLoggedIn ? (
        <header className="w-[100%] bg-[#C75D2C] px-[30px] py-[16px] opacity-80">
          <nav className="flex justify-between items-center">
            <NavLink
              to="/"
              className="text-xl text-white tracking-wider font-semibold"
            >
              BIBLIOTEKA
            </NavLink>
            <div>
              <NavLink
                to="/"
                className="p-2 text-white font-semibold opacity-100"
              >
                Početna strana
              </NavLink>
              <NavLink
                to="/search"
                className="p-2 mx-2 text-white font-semibold opacity-100"
              >
                Pretraga knjiga
              </NavLink>
              {userData.is_admin && (
                <NavLink
                  to="/admin"
                  className="p-2 mx-2 text-white font-semibold opacity-100"
                >
                  Administracija
                </NavLink>
              )}
              <div className="inline-block p-2 mx-2 text-white font-semibold opacity-100">
                <img
                  className="inline-block mr-2"
                  src={ProfileCard}
                  alt="A profile card icon"
                />
                {userData.name}
              </div>
              <Button
                btnStyle="p-2 mx-2 bg-white text-[#C75D2C] font-semibold opacity-100 rounded-md"
                btnText="Odjavi se"
                onClick={() => {
                  auth.logout();
                  navigate(`/login`);
                }}
              />
            </div>
          </nav>
        </header>
      ) : (
        <header className="w-[100%] bg-[#C75D2C] px-[30px] py-[20px] opacity-80">
          <nav className="flex justify-between items-center">
            <NavLink
              to="/"
              className="text-xl text-white tracking-wider font-semibold"
            >
              BIBLIOTEKA
            </NavLink>
            <div>
              <NavLink
                to="/"
                className="p-2 text-white font-semibold opacity-100"
              >
                Početna strana
              </NavLink>
              <NavLink
                to="/search"
                className="p-2 mx-2 text-white font-semibold opacity-100"
              >
                Pretraga knjiga
              </NavLink>
              <NavLink
                to="/signup"
                className="p-2 mx-2 bg-white text-[#C75D2C] font-semibold opacity-100 rounded-md"
              >
                Registruj se
              </NavLink>
              <NavLink
                to="/login"
                className="p-2 mx-2 bg-white text-[#C75D2C] font-semibold opacity-100 rounded-md"
              >
                Prijavi se
              </NavLink>
            </div>
          </nav>
        </header>
      )}
    </>
  );
};

export default Navbar;
