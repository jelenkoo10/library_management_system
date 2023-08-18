import React from "react";
import { useState, useEffect } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import BookCard from "../books/BookCard";
import LoadingSpinner from "../UIElements/LoadingSpinner/LoadingSpinner";

const Wishlist = ({ userId }) => {
  const [books, setBooks] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    async function getWishlistBooks() {
      const responseData = await sendRequest(
        `http://localhost:5000/api/users/wishlist/${userId}`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      setBooks(responseData.wishlistBooks);
    }

    getWishlistBooks();
  }, []);

  return (
    <div
      className={`grid grid-cols-2 gap-4 sm:h-[60vh] sm:overflow-y-scroll md:h-fit md:overflow-y-auto ${
        books.length > 8 ? "overflow-y-scroll h-[65vh]" : null
      }`}
    >
      {isLoading && <LoadingSpinner asOverlay />}
      {books &&
        books.map((book) => (
          <div className="bg-[#CCC] text-[#C75D2C] rounded-md pr-8 pl-4 py-4 text-white border border-[#C75D2C] bg-opacity-90">
            <div className="flex justify-between">
              <h1 className="text-[#C75D2C] text-xl font-bold">{book.title}</h1>
            </div>
            <p className="text-[#C75D2C] text-md font-semibold">
              {book.authorName}
            </p>
            {book.loan_expiry && (
              <p className="text-[#C75D2C] text-sm">
                Rok isteka pozajmice: {book.loan_expiry.slice(0, 10)}
              </p>
            )}
            {book.branchName && (
              <p className="text-[#C75D2C] text-sm">
                Ogranak: {book.branchName}
              </p>
            )}
          </div>
        ))}
    </div>
  );
};

export default Wishlist;
