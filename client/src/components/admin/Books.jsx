import { useState, useEffect } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import AdminBookCard from "./AdminBookCard";
import LoadingSpinner from "../UIElements/LoadingSpinner/LoadingSpinner";
import AdminBookUpdateModal from "./AdminBookUpdateModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [branches, setBranches] = useState([]);
  const [currentBranch, setCurrentBranch] = useState(null);
  const { error, isLoading, sendRequest } = useHttpClient();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [reload, setReload] = useState(false);
  const [updating, setUpdating] = useState(null);

  function reloadPage() {
    setReload(!reload);
  }

  const deleteBook = async (id) => {
    try {
      const response = await sendRequest(
        `http://localhost:5000/api/books/${id}`,
        "DELETE",
        null,
        {
          "Content-Type": "application/json",
        }
      );

      toast.success("Uspešno ste obrisali knjigu!", {
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
    } catch (err) {
      console.log(err);
      alert("Neuspešno brisanje", error);
    }
  };

  const confirmBookReservation = async (id) => {
    const response = await sendRequest(
      `http://localhost:5000/api/books/assign/${id}`,
      "PATCH",
      null,
      {
        "Content-Type": "application/json",
      }
    );

    toast.success("Uspešno ste potvrdili rezervaciju!", {
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
  };

  const updateBook = (book) => {
    setUpdating(book);
  };

  function stopUpdating() {
    setUpdating(null);
  }

  useEffect(() => {
    async function fetchBranch() {
      const response = await sendRequest(
        `http://localhost:5000/api/users/branches/${userData.userId}`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      setBranches(response.branches);
      setCurrentBranch(response.branches[0]);
    }
    fetchBranch();
  }, []);

  useEffect(() => {
    async function fetchBooks() {
      const response = await sendRequest(
        `http://localhost:5000/api/books/branch/${currentBranch._id}`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      setBooks(response.books);
    }
    fetchBooks();
  }, [branches, currentBranch, reload]);

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <section className="p-5 bg-[#DDD] border border-[#C75D2C] bg-opacity-90 sm:h-fit sm:max-h-fit xl:w-2/3 lg:min-h-[70vh]">
        <div className="grid grid-cols-4 gap-4 place-items-center items-center h-[100%] sm:flex sm:flex-col md:grid md:grid-cols-2 md:gap-4 md:mx-auto md:h-[60vh] lg:grid-cols-3 lg:gap-2">
          {books &&
            books.map((book) => (
              <AdminBookCard
                cardStyle="bg-[#C75D2C] rounded-md pr-8 pl-2 py-4 text-white w-[250px] min-h-[180px]"
                book={book}
                deleteBook={deleteBook}
                updateBook={updateBook}
                confirmBookReservation={confirmBookReservation}
              />
            ))}
        </div>
        {!books[0] && (
          <p className="text-[#C75D2C] text-lg font-bold w-3/5">
            Trenutno nema knjiga u ovom ogranku.
          </p>
        )}
      </section>
      {updating && (
        <AdminBookUpdateModal
          book={updating}
          branches={branches}
          stopUpdating={stopUpdating}
          reloadPage={reloadPage}
        />
      )}
    </>
  );
};

export default Books;
