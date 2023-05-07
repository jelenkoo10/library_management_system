import React from "react";

const Footer = () => {
  return (
    <footer className="p-3 bg-[#C75D23] opacity-80 absolute bottom-0 left-0 right-0">
      <p className="text-center text-white font-bold text-lg">
        &copy; FIN 2023. Sva prava zadržana.
      </p>
      <div className="text-center text-white ml-2 mt-1">
        <span className="px-4">Kako se učlaniti?</span>
        <span className="px-4 border-l-2">Pretraga knjiga</span>
        <span className="px-4 border-l-2">O kreatorima</span>
      </div>
    </footer>
  );
};

export default Footer;
