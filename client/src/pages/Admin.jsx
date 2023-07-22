import { useState } from "react";
import Books from "../components/admin/Books";
import { NavLink } from "react-router-dom";
import Button from "../components/UIElements/Button";
import AdminAddModal from "../components/admin/AdminAddModal";
import Users from "../components/admin/Users";

const Admin = () => {
  const [currentPage, setCurrentPage] = useState("books");
  const [modal, setModal] = useState(null);

  function closeModal() {
    setModal(null);
  }

  return (
    <div className="flex mt-20 ml-20 sm:m-4 sm:flex-col xl:flex-row">
      <nav className="flex flex-col text-[#C75D2C] text-xl font-bold sm:flex-row md:w-full xl:flex-col xl:w-[300px] xl:h-[585px] 2xl:h-[10vh]">
        <NavLink
          className={`border border-[#C75D2C] bg-[#DDD] sm:p-2 sm:my-auto sm:py-16 sm:h-[150px] sm:w-1/3 md:text-center md:p-10 xl:h-fit xl:p-8 xl:w-[300px] xl:h-[120px] xl:my-0 ${
            currentPage == "books" ? "underline" : ""
          }`}
          onClick={() => setCurrentPage("books")}
        >
          Knjige
        </NavLink>
        <NavLink
          className={`border border-[#C75D2C] bg-[#DDD] sm:p-2 sm:my-auto sm:py-16 sm:h-[150px] sm:w-1/3 md:text-center md:p-10 xl:h-fit xl:p-8 xl:w-[300px] xl:h-[120px] xl:my-0 ${
            currentPage === "users" ? "underline" : ""
          }`}
          onClick={() => setCurrentPage("users")}
        >
          Korisnici
        </NavLink>
        <div
          className={`border border-[#C75D2C] bg-[#DDD] sm:p-2 sm:h-[150px] sm:w-full sm:my-auto flex flex-col xl:h-fit xl:p-8 xl:w-[300px] xl:my-0 xl:p-4 xl:h-[360px] xl:justify-around`}
          onClick={() => setCurrentPage("authors")}
        >
          <Button
            btnStyle="py-2 px-5 mx-2 mt-3 bg-[#C75D2C] text-white font-semibold opacity-100 rounded-md md:w-1/2 md:mx-auto xl:w-full xl:py-4"
            btnText="Dodaj knjigu"
            onClick={() => setModal("book")}
          />
          <Button
            btnStyle="py-2 px-5 mx-2 mt-3 bg-[#C75D2C] text-white font-semibold opacity-100 rounded-md md:w-1/2 md:mx-auto xl:w-full xl:py-4"
            btnText="Dodaj pisca"
            onClick={() => setModal("author")}
          />
        </div>
      </nav>
      {currentPage === "books" && <Books />}
      {currentPage === "users" && <Users />}
      {modal && <AdminAddModal closeModal={closeModal} modal={modal} />}
    </div>
  );
};

export default Admin;
