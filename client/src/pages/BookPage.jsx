import React, { useState, useEffect } from "react";
import BookDetailed from "../components/books/BookDetailed";
import BookInfo from "../components/books/BookInfo";
import AvailabilityTable from "../components/books/AvailabilityTable";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../hooks/http-hook";
import LoadingSpinner from "../components/UIElements/LoadingSpinner/LoadingSpinner";

const BookPage = () => {
  const [book, setBook] = useState({});
  const bookId = useParams();
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
    }

    getBookInfo();
  }, []);

  return (
    <div className="flex bg-white bg-opacity-80 w-3/4 mx-auto mt-10 p-8 rounded-lg">
      {isLoading && <LoadingSpinner asOverlay />}
      {!error && (
        <>
          <div className="w-2/5">
            <BookInfo
              title={book.title}
              authorName={book.authorName}
              year_published={book.year_published}
              author={book.author}
            />
            <BookDetailed
              description={book.description}
              genre={book.genre}
              language={book.language}
            />
          </div>
          <AvailabilityTable
            bookTitle={book.title}
            authorName={book.authorName}
          />
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
