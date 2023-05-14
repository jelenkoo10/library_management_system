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
      <section className="p-12 bg-[#DDD] border border-[#C75D2C] bg-opacity-90 grid grid-cols-2 gap-6 items-center">
        {myBooks &&
          myBooks.map((book) => (
            <BookCard
              cardStyle="bg-[#C75D2C] rounded-md pr-8 pl-2 py-4 text-white"
              book={book}
            />
          ))}
      </section>
    </>
  );
};

export default BookList;
