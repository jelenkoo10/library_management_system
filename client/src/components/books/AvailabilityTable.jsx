import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import AvailabilityCard from "./AvailabilityCard";
import LoadingSpinner from "../UIElements/LoadingSpinner/LoadingSpinner";

const AvailabilityTable = (props) => {
  const { bookTitle, authorName } = props;
  const [allBooks, setAllBooks] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    async function getAllBooks() {
      const responseData = await sendRequest(
        `http://localhost:5000/api/books/availability?book=${
          bookTitle ? bookTitle.toLowerCase() : ""
        }&author=${authorName ? authorName.toLowerCase() : ""}`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      setAllBooks(responseData.books);
    }

    getAllBooks();
  }, [bookTitle, authorName]);

  return (
    <div className="w-3/5">
      {isLoading && <LoadingSpinner asOverlay />}
      {allBooks &&
        allBooks.map((book) => (
          <AvailabilityCard
            id={book.id}
            title={book.title}
            authorName={book.authorName}
            branchName={book.branchName}
            status={book.status}
          />
        ))}
    </div>
  );
};

export default AvailabilityTable;
