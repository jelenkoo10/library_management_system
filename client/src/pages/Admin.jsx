import React, { useState } from "react";
import Books from "../components/admin/Books";
import { NavLink } from "react-router-dom";
import Button from "../components/UIElements/Button";
import Users from "../components/admin/Users";
import AdminAddBookForm from "../components/admin/AdminAddBookForm";
import AdminAddAuthorForm from "../components/admin/AdminAddAuthorForm";
import AdminImportExcelForm from "../components/admin/AdminImportExcelForm";
import { ModalContext } from "../context/modal-context";
import AdminAnalyticsPage from "../components/admin/AdminAnalyticsPage";

const Admin = () => {
  let { handleModal } = React.useContext(ModalContext);
  const [currentPage, setCurrentPage] = useState("books");

  return (
    <div className="flex mt-20 ml-20 sm:m-4 sm:flex-col lg:flex-row">
      <nav className="flex flex-col text-[#C75D2C] text-xl font-bold sm:flex-row md:w-full lg:flex-col lg:w-[300px] lg:h-[585px] 2xl:h-[10vh]">
        <div className="border border-[#C75D2C] bg-[#DDD] sm:h-[200px] sm:w-full sm:my-auto flex flex-col md:flex-row lg:flex-col lg:h-fit lg:w-[300px] xl:justify-around">
          <NavLink
            className={`border border-[#C75D2C] bg-[#DDD] sm:p-2 sm:h-1/3 sm:text-center md:py-16 md:w-1/3 md:h-full lg:w-full lg:h-[80px] lg:p-4 xl:h-fit xl:p-8 xl:w-[300px] xl:h-[120px] xl:my-0 ${
              currentPage == "books" ? "underline" : ""
            }`}
            onClick={() => setCurrentPage("books")}
          >
            Knjige
          </NavLink>
          <NavLink
            className={`border border-[#C75D2C] bg-[#DDD] sm:p-2 sm:h-1/3 sm:text-center md:py-16 md:w-1/3 md:h-full lg:w-full lg:h-[80px] lg:p-4 xl:h-fit xl:p-8 xl:w-[300px] xl:h-[120px] xl:my-0 ${
              currentPage === "users" ? "underline" : ""
            }`}
            onClick={() => setCurrentPage("users")}
          >
            Korisnici
          </NavLink>
          <NavLink
            className={`border border-[#C75D2C] bg-[#DDD] sm:p-2 sm:h-1/3 sm:text-center md:py-16 md:w-1/3 md:h-full lg:w-full lg:h-[80px] lg:p-4 xl:h-fit xl:p-8 xl:w-[300px] xl:h-[120px] xl:my-0 ${
              currentPage === "analytics" ? "underline" : ""
            }`}
            onClick={() => setCurrentPage("analytics")}
          >
            Statistika
          </NavLink>
        </div>
        <div
          className={`border border-[#C75D2C] bg-[#DDD] sm:p-2 sm:h-[200px] sm:w-full sm:my-auto flex flex-col lg:flex-row lg:flex-col lg:h-fit lg:p-8 lg:w-[300px] xl:my-0 xl:p-4 xl:h-[360px] xl:justify-around`}
          onClick={() => setCurrentPage("authors")}
        >
          <Button
            btnStyle="py-2 px-5 mx-2 mt-3 bg-[#C75D2C] text-white font-semibold opacity-100 rounded-md sm:h-[45px] sm:text-sm md:text-lg md:w-2/3 md:mx-auto lg:w-3/4 lg:p-2 lg:h-[80px] xl:w-full xl:py-4"
            btnText="Dodaj knjigu"
            onClick={() =>
              handleModal("Dodavanje knjige", <AdminAddBookForm />)
            }
          />
          <Button
            btnStyle="py-2 px-5 mx-2 mt-3 bg-[#C75D2C] text-white font-semibold opacity-100 rounded-md sm:h-[45px] sm:text-sm md:text-lg md:w-2/3 md:mx-auto lg:w-3/4 lg:p-2 lg:h-[80px] xl:w-full xl:py-4"
            btnText="Dodaj pisca"
            onClick={() =>
              handleModal("Dodavanje autora", <AdminAddAuthorForm />)
            }
          />
          <Button
            btnStyle="py-2 px-5 mx-2 mt-3 bg-[#C75D2C] text-white font-semibold opacity-100 rounded-md sm:h-[45px] sm:text-sm md:text-lg md:w-2/3 md:mx-auto lg:w-3/4 lg:p-2 lg:h-[80px] xl:w-full xl:py-4"
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
      {currentPage === "analytics" && <AdminAnalyticsPage />}
    </div>
  );
};

export default Admin;
