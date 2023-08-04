import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import BookCard from "./BookCard";
import { useHttpClient } from "../../hooks/http-hook";
import LoadingSpinner from "../UIElements/LoadingSpinner/LoadingSpinner";
import { useParams } from "react-router-dom";
import WarningIcon from "../../assets/warning.png";
import DueIcon from "../../assets/past-due.png";

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
      <section className="p-12 bg-[#DDD] border border-[#C75D2C] bg-opacity-90 lg:w-[900px] sm:w-full">
        <div className="grid grid-cols-4 gap-4 place-items-center items-center sm:flex sm:flex-col md:grid md:grid-cols-2 md:gap-4 md:mx-auto lg:grid-cols-3 lg:gap-2">
          {myBooks &&
            myBooks
              .filter((book) => {
                return book.status == "zauzeto";
              })
              .map((book) => (
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
        <div className="mt-8 flex items-center">
          <img
            src={WarningIcon}
            alt="Warning icon"
            width="30px"
            height="20px"
          />{" "}
          <p className="text-[#C75D2C] font-bold">
            {" "}
            - manje od 10 dana do isteka pozajmice
          </p>
        </div>
        <div className="mt-2 flex items-center">
          <img src={DueIcon} alt="Error icon" width="30px" height="20px" />{" "}
          <p className="text-[#C75D2C] font-bold">- istekla pozajmica</p>
        </div>
      </section>
    </>
  );
};

export default BookList;
