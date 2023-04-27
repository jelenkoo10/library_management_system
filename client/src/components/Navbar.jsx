import React from "react";

const Navbar = () => {
  return (
    <header className="w-[100%] bg-[#C75D2C] px-[30px] py-[20px] opacity-80">
      <nav className="flex justify-between items-center">
        <div className="text-xl text-white tracking-wider font-semibold">
          BIBLIOTEKA
        </div>
        <div>
          <button className="p-2 mx-2 bg-white text-[#C75D2C] font-semibold opacity-100 rounded-md">
            Registruj se
          </button>
          <button className="p-2 mx-2 bg-white text-[#C75D2C] font-semibold opacity-100 rounded-md">
            Prijavi se
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
