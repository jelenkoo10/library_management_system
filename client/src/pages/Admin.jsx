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
    <div className="flex mt-20 ml-20">
      <nav className="flex flex-col text-[#C75D2C] text-xl font-bold">
        <NavLink
          className={`border border-[#C75D2C] p-10 bg-[#DDD] ${
            currentPage == "books" ? "underline" : ""
          }`}
          onClick={() => setCurrentPage("books")}
        >
          Knjige
        </NavLink>
        <NavLink
          className={`border border-[#C75D2C] p-10 bg-[#DDD] ${
            currentPage === "users" ? "underline" : ""
          }`}
          onClick={() => setCurrentPage("users")}
        >
          Korisnici
        </NavLink>
        <div
          className={`border border-[#C75D2C] p-10 bg-[#DDD] flex flex-col`}
          onClick={() => setCurrentPage("authors")}
        >
          <Button
            btnStyle="py-2 px-5 mx-2 mt-3 bg-[#C75D2C] text-white font-semibold opacity-100 rounded-md"
            btnText="Dodaj knjigu"
            onClick={() => setModal("book")}
          />
          <Button
            btnStyle="py-2 px-5 mx-2 mt-3 bg-[#C75D2C] text-white font-semibold opacity-100 rounded-md"
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
