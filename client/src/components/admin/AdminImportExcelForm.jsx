import React, { useEffect, useState, useContext } from "react";
import Button from "../UIElements/Button";
import Input from "../UIElements/Input";
import Select from "../UIElements/Select";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../UIElements/LoadingSpinner/LoadingSpinner";

const AdminImportExcelForm = ({ closeModal }) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // Kreirajte FormData objekat i dodajte izabrani fajl na njega
      const formData = new FormData();
      formData.append("excelFile", selectedFile);
      const responseData = await sendRequest(
        `http://localhost:5000/api/books/import`,
        "POST",
        formData
      );

      // Sada možete poslati formData objekat na server koristeći Fetch ili neki drugi API klijent
      // Na serveru ćete tretirati ovaj fajl i obraditi ga kao što je objašnjeno u prethodnom odgovoru

      // Resetujte stanje forme
      setSelectedFile(null);
    } catch (err) {
      console.log(err);
      alert("Neuspešno dodavanje!", error);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <form
        onSubmit={handleSubmit}
        className="px-8 py-16 mx-auto bg-white rounded-lg"
      >
        <input type="file" onChange={handleFileChange} />
        <Button
          btnStyle="mx-auto bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md hover:bg-[#D76D3C]"
          btnText="Dodaj knjige"
        />
      </form>
    </>
  );
};

export default AdminImportExcelForm;
