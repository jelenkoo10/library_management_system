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

  const downloadTemplate = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/books/downloadtemplate`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "blob",
        }
      );

      if (response.ok) {
        const filename = "template.xlsx";
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Uspešno ste preuzeli Excel template datoteku!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          bodyClassName: "toast",
        });
      } else {
        throw new Error("Greška u preuzimanju fajla");
      }
    } catch (error) {
      console.error("Greška u preuzimanju fajla: ", error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("excelFile", selectedFile);
      const responseData = await sendRequest(
        `http://localhost:5000/api/books/import`,
        "POST",
        formData
      );

      toast.success("Uspešno ste dodali listu knjiga!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        bodyClassName: "toast",
      });

      setTimeout(() => {
        window.location.reload();
      }, 3500);
      setSelectedFile(null);
    } catch (err) {
      alert("Neuspešno dodavanje!", error);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <form onSubmit={handleSubmit} className="p-4 mx-auto bg-white">
        <p className="mb-6 text-md">
          Umesto svake knjige pojedinačno, sada možete dodavati koliko god
          želite knjiga odjednom; uslov je da ih unesete u Excel datoteku, i da
          tu datoteku zatim prosledite na server putem dugmeta "Dodaj knjige".
          Klikni{" "}
          <span className="text-[#C75D2C] font-bold" onClick={downloadTemplate}>
            ovde
          </span>{" "}
          da preuzmeš template datoteku, koju možete izmeniti radi unosa svojih
          knjiga.
        </p>
        <input type="file" onChange={handleFileChange} />
        <Button
          btnStyle="mx-auto bg-[#C75D2C] mt-6 px-6 py-2 text-white text-lg font-bold rounded-md hover:bg-[#D76D3C]"
          btnText="Dodaj knjige"
        />
      </form>
    </>
  );
};

export default AdminImportExcelForm;
