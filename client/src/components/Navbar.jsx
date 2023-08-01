import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import Button from "./UIElements/Button";
import ProfileCard from "../assets/profile_card.png";
import HamburgerMenu from "react-hamburger-menu";

const Navbar = () => {
  const auth = useContext(AuthContext);
  const userData = auth.isLoggedIn
    ? JSON.parse(localStorage.getItem("userData"))
    : null;
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <>
      <header className="w-[100%] bg-[#C75D2C] px-[30px] py-[16px] bg-opacity-80">
        <nav className="flex justify-between items-center">
          <NavLink
            to="/"
            className="text-xl text-white tracking-wider font-semibold"
          >
            BIBLIOTEKA
          </NavLink>
          <div className="md:hidden">
            <HamburgerMenu
              isOpen={isMenuOpen}
              menuClicked={handleMenuToggle}
              width={30}
              height={20}
              strokeWidth={3}
              rotate={0}
              color="white"
              borderRadius={0}
              animationDuration={1}
            />
          </div>
          <div className="hidden md:flex items-center opacity-80">
            <NavLink
              to="/"
              className="p-2 text-white font-semibold opacity-100 sm:my-[8px] md:my-0"
            >
              Početna strana
            </NavLink>
            <NavLink
              to="/search"
              className="p-2 mx-2 text-white font-semibold opacity-100 sm:my-[8px] md:my-0"
            >
              Pretraga knjiga
            </NavLink>
            {userData?.is_admin && (
              <NavLink
                to="/admin"
                className="p-2 mx-2 text-white font-semibold opacity-100 sm:my-[8px] md:my-0"
              >
                Administracija
              </NavLink>
            )}
            {auth.isLoggedIn ? (
              <>
                <NavLink
                  to={`/profile/${userData.userId}`}
                  className="inline-block p-2 mx-2 text-white font-semibold opacity-100 sm:my-[8px] md:my-0"
                >
                  <img
                    className="inline-block mr-2"
                    src={ProfileCard}
                    alt="A profile card icon"
                  />
                  {userData.name}
                </NavLink>
                <Button
                  btnStyle="p-2 mx-2 bg-white text-[#C75D2C] font-semibold opacity-100 sm:my-[8px] md:my-0 rounded-md"
                  btnText="Odjavi se"
                  onClick={() => {
                    auth.logout();
                    navigate(`/login`);
                  }}
                />
              </>
            ) : (
              <>
                <Button
                  btnStyle="p-2 mx-2 bg-white text-[#C75D2C] font-semibold opacity-100 sm:my-[8px] md:my-0 rounded-md"
                  btnText="Registruj se"
                  onClick={() => {
                    navigate(`/signup`);
                  }}
                />
                <Button
                  btnStyle="p-2 mx-2 bg-white text-[#C75D2C] font-semibold opacity-100 sm:my-[8px] md:my-0 rounded-md"
                  btnText="Prijavi se"
                  onClick={() => {
                    navigate(`/login`);
                  }}
                />
              </>
            )}
          </div>
        </nav>
      </header>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="bg-[#C75D2C] flex flex-col items-center opacity-80">
            <NavLink
              to="/"
              onClick={handleMenuToggle}
              className="p-2 text-white font-semibold opacity-100 sm:my-[8px] md:my-0"
            >
              Početna strana
            </NavLink>
            <NavLink
              to="/search"
              onClick={handleMenuToggle}
              className="p-2 mx-2 text-white font-semibold opacity-100 sm:my-[8px] md:my-0"
            >
              Pretraga knjiga
            </NavLink>
            {userData?.is_admin && (
              <NavLink
                to="/admin"
                onClick={handleMenuToggle}
                className="p-2 mx-2 text-white font-semibold opacity-100 sm:my-[8px] md:my-0"
              >
                Administracija
              </NavLink>
            )}
            {auth.isLoggedIn ? (
              <>
                <NavLink
                  to={`/profile/${userData.userId}`}
                  onClick={handleMenuToggle}
                  className="inline-block p-2 mx-2 text-white font-semibold opacity-100 sm:my-[8px] md:my-0"
                >
                  <img
                    className="inline-block mr-2"
                    src={ProfileCard}
                    alt="A profile card icon"
                  />
                  {userData.name}
                </NavLink>
                <Button
                  btnStyle="p-2 mx-2 bg-white text-[#C75D2C] font-semibold opacity-100 sm:my-[8px] md:my-0 rounded-md"
                  btnText="Odjavi se"
                  onClick={() => {
                    auth.logout();
                    handleMenuToggle();
                    navigate(`/login`);
                  }}
                />
              </>
            ) : (
              <>
                <Button
                  btnStyle="p-2 mx-2 bg-white text-[#C75D2C] font-semibold opacity-100 sm:my-[8px] md:my-0 rounded-md"
                  btnText="Registruj se"
                  onClick={() => {
                    handleMenuToggle();
                    navigate(`/signup`);
                  }}
                />
                <Button
                  btnStyle="p-2 mx-2 bg-white text-[#C75D2C] font-semibold opacity-100 sm:my-[8px] md:my-0 rounded-md"
                  btnText="Prijavi se"
                  onClick={() => {
                    handleMenuToggle();
                    navigate(`/login`);
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
