import React, { useState, useEffect, useContext } from "react";
import BookDetailed from "../components/books/BookDetailed";
import BookInfo from "../components/books/BookInfo";
import AvailabilityTable from "../components/books/AvailabilityTable";
import BookComments from "../components/books/BookComments";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../hooks/http-hook";
import LoadingSpinner from "../components/UIElements/LoadingSpinner/LoadingSpinner";
import { AuthContext } from "../context/auth-context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookPage = () => {
  const [book, setBook] = useState({});
  const [page, setPage] = useState("availability");
  const [isOnWishlist, setIsOnWishlist] = useState();
  const bookId = useParams();
  const auth = useContext(AuthContext);
  const userId = auth.isLoggedIn
    ? JSON.parse(localStorage.getItem("userData")).userId
    : null;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    async function getBookInfo() {
      const responseData = await sendRequest(
        `http://localhost:5000/api/books/id/${bookId.bid}`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      setBook(responseData.book);

      if (book.wishlist.includes(userId)) {
        setIsOnWishlist(true);
      } else {
        setIsOnWishlist(false);
      }
    }

    getBookInfo();
  }, []);

  const changeWishlist = async () => {
    if (isOnWishlist) {
      const responseData = await sendRequest(
        `http://localhost:5000/api/books/removewishlist/${book.id}`,
        "PATCH",
        JSON.stringify({ userId: userId }),
        {
          "Content-Type": "application/json",
        }
      );
      toast.success("Uklonili ste knjigu iz Vaše liste želja.", {
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
      const responseData = await sendRequest(
        `http://localhost:5000/api/books/setwishlist/${book.id}`,
        "PATCH",
        JSON.stringify({ userId: userId }),
        {
          "Content-Type": "application/json",
        }
      );
      toast.success("Dodali ste knjigu u Vašu listu želja.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        bodyClassName: "toast",
      });
    }

    setIsOnWishlist((prev) => !prev);
  };

  return (
    <div className="lg:flex lg:flex-row bg-white bg-opacity-80 w-3/4 mx-auto mt-10 p-8 rounded-lg sm:flex-col sm:w-11/12 sm:rounded-md md:w-10/12">
      {isLoading && <LoadingSpinner asOverlay />}
      {!error && (
        <>
          <div className="w-2/5 sm:w-full">
            <BookInfo
              title={book.title}
              authorName={book.authorName}
              year_published={book.year_published}
              author={book.author}
              likedBy={book.likedBy?.length}
            />
            <BookDetailed
              description={book.description}
              genre={book.genre}
              language={book.language}
              pdf={book.pdf}
              isOnWishlist={isOnWishlist}
              setIsOnWishlist={changeWishlist}
            />
          </div>
          <div>
            <div className="mx-auto flex justify-center mt-6">
              <button
                className={`bg-[#EEE] border-2 border-[#C75D2C] px-4 py-2 text-[#C75D2C] font-bold ${
                  page == "availability" ? "underline" : null
                }`}
                onClick={() => {
                  setPage("availability");
                }}
              >
                Dostupnost knjiga
              </button>
              <button
                className={`bg-[#EEE] border-2 border-[#C75D2C] px-4 py-2 text-[#C75D2C] font-bold ${
                  page == "comments" ? "underline" : null
                }`}
                onClick={() => {
                  setPage("comments");
                }}
              >
                Komentari
              </button>
            </div>
            {page == "availability" && (
              <AvailabilityTable
                bookTitle={book.title}
                authorName={book.authorName}
              />
            )}
            {page == "comments" && <BookComments book={book} />}
          </div>
        </>
      )}
      {error && (
        <p className="text-lg text-[#C75D2C] font-bold">
          Žao nam je, došlo je do greške. Može se desiti da ne postoji knjiga sa
          odgovarajućim ID brojem, ili je došlo do greške na serveru.
        </p>
      )}
    </div>
  );
};

export default BookPage;
