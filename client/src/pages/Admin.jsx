import React, { useState } from "react";
import Books from "../components/admin/Books";
import { NavLink } from "react-router-dom";
import Button from "../components/UIElements/Button";
import Users from "../components/admin/Users";
import AdminAddBookForm from "../components/admin/AdminAddBookForm";
import AdminAddAuthorForm from "../components/admin/AdminAddAuthorForm";
import AdminImportExcelForm from "../components/admin/AdminImportExcelForm";
import { ModalContext } from "../context/modal-context";

const Admin = () => {
  let { handleModal } = React.useContext(ModalContext);
  const [currentPage, setCurrentPage] = useState("books");

  return (
    <div className="flex mt-20 ml-20 sm:m-4 sm:flex-col xl:flex-row">
      <nav className="flex flex-col text-[#C75D2C] text-xl font-bold sm:flex-row md:w-full xl:flex-col xl:w-[300px] xl:h-[585px] 2xl:h-[10vh]">
        <NavLink
          className={`border border-[#C75D2C] bg-[#DDD] sm:p-2 sm:my-auto sm:py-16 sm:h-[200px] sm:w-1/3 sm:text-center md:py-16 lg:w-1/4 lg:h-[120px] lg:p-4 xl:h-fit xl:p-8 xl:w-[300px] xl:h-[120px] xl:my-0 ${
            currentPage == "books" ? "underline" : ""
          }`}
          onClick={() => setCurrentPage("books")}
        >
          Knjige
        </NavLink>
        <NavLink
          className={`border border-[#C75D2C] bg-[#DDD] sm:p-2 sm:my-auto sm:py-16 sm:h-[200px] sm:w-1/3 md:text-center md:py-16 lg:w-1/4 lg:h-[120px] lg:p-4 xl:h-fit xl:p-8 xl:w-[300px] xl:h-[120px] xl:my-0 ${
            currentPage === "users" ? "underline" : ""
          }`}
          onClick={() => setCurrentPage("users")}
        >
          Korisnici
        </NavLink>
        <div
          className={`border border-[#C75D2C] bg-[#DDD] sm:p-2 sm:h-[200px] sm:w-full sm:my-auto flex flex-col lg:flex-row lg:h-[120px] xl:flex-col xl:h-fit xl:p-8 xl:w-[300px] xl:my-0 xl:p-4 xl:h-[360px] xl:justify-around`}
          onClick={() => setCurrentPage("authors")}
        >
          <Button
            btnStyle="py-2 px-5 mx-2 mt-3 bg-[#C75D2C] text-white font-semibold opacity-100 rounded-md md:w-2/3 md:mx-auto lg:w-1/4 lg:p-2 lg:h-[80px] xl:w-full xl:py-4"
            btnText="Dodaj knjigu"
            onClick={() =>
              handleModal("Dodavanje knjige", <AdminAddBookForm />)
            }
          />
          <Button
            btnStyle="py-2 px-5 mx-2 mt-3 bg-[#C75D2C] text-white font-semibold opacity-100 rounded-md md:w-2/3 md:mx-auto lg:w-1/4 lg:p-2 lg:h-[80px] xl:w-full xl:py-4"
            btnText="Dodaj pisca"
            onClick={() =>
              handleModal("Dodavanje autora", <AdminAddAuthorForm />)
            }
          />
          <Button
            btnStyle="py-2 px-5 mx-2 mt-3 bg-[#C75D2C] text-white font-semibold opacity-100 rounded-md md:w-2/3 md:mx-auto lg:w-1/4 lg:p-2 lg:h-[80px] xl:w-full xl:py-4"
            btnText="Dodaj listu knjiga"
            onClick={() =>
              handleModal(
                "Dodavanje knjiga putem Excel fajla",
                <AdminImportExcelForm />
              )
            }
          />
        </div>
      </nav>
      {currentPage === "books" && <Books />}
      {currentPage === "users" && <Users />}
    </div>
  );
};

export default Admin;
