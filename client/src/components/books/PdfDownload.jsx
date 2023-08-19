import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PdfDownload = (props) => {
  const { pdf } = props;
  const { bid } = useParams();

  const downloadBook = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/books/download/${bid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "blob",
        }
      );

      if (response.ok) {
        const filename = "book-" + pdf.slice(37);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Uspešno ste preuzeli PDF knjigu!", {
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

  // download target="_blank"
  return (
    <div
      className="mt-4 p-2 rounded-md border border-[#C75D2C] w-fit text-[#C75D2C] font-semibold flex bg-[#DDD] cursor-pointer"
      onClick={downloadBook}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1.25em"
        viewBox="0 0 512 512"
        fill="#c75d2c"
        className="mr-3"
      >
        <path d="M64 464H96v48H64c-35.3 0-64-28.7-64-64V64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V288H336V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16zM176 352h32c30.9 0 56 25.1 56 56s-25.1 56-56 56H192v32c0 8.8-7.2 16-16 16s-16-7.2-16-16V448 368c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24H192v48h16zm96-80h32c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H304c-8.8 0-16-7.2-16-16V368c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H320v96h16zm80-112c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16s-7.2 16-16 16H448v32h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H448v48c0 8.8-7.2 16-16 16s-16-7.2-16-16V432 368z" />
      </svg>
      <span>Preuzmi PDF za čitanje</span>
    </div>
  );
};

export default PdfDownload;
