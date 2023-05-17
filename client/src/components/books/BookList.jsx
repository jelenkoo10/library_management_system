import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import BookCard from "./BookCard";
import { useHttpClient } from "../../hooks/http-hook";
import LoadingSpinner from "../UIElements/LoadingSpinner/LoadingSpinner";
import { useParams } from "react-router-dom";

const BookList = (props) => {
  const [myBooks, setMyBooks] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { uid } = useParams();

  useEffect(() => {
    async function fetchBooks() {
      const responseData = await sendRequest(
        `http://localhost:5000/api/books/${uid}/books`,
        "GET",
        null,
        { "Content-Type": "application/json" }
      );
      setMyBooks(responseData.books);
    }

    fetchBooks();
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <section className="p-12 bg-[#DDD] border border-[#C75D2C] bg-opacity-90 w-[900px]">
        <div className="grid grid-cols-2 gap-6 items-center">
          {myBooks &&
            myBooks.map((book) => (
              <BookCard
                cardStyle="bg-[#CCC] text-[#C75D2C] rounded-md pr-8 pl-4 py-4 text-white border border-[#C75D2C] bg-opacity-90"
                book={book}
              />
            ))}
        </div>
        {!myBooks[0] && (
          <p className="text-[#C75D2C] text-lg font-bold w-3/5">
            Trenutno nema vaših knjiga. Kada rezervišete knjigu, ona će biti
            prikazana ovde.
          </p>
        )}
      </section>
    </>
  );
};

export default BookList;
