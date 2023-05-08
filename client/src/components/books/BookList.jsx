import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import BookCard from "./BookCard";

const BookList = (props) => {
  const [myBooks, setMyBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch(
        "http://localhost:5000/api/books/644506351bd88b2d9ccd80c0/books"
      );
      const data = await response.json();
      setMyBooks(data.books);
    }

    fetchBooks();
  }, []);

  console.log(myBooks);

  return (
    <section className="p-12 bg-[#DDD] border border-[#C75D2C] opacity-90 grid grid-cols-2 gap-6 items-center">
      {myBooks && (
        <>
          <BookCard
            cardStyle="bg-[#C75D2C] rounded-md pr-8 pl-2 py-4 text-white"
            book={myBooks[0]}
          />

          <BookCard
            cardStyle="bg-[#C75D2C] rounded-md pr-8 pl-2 py-4 text-white"
            book={myBooks[1]}
          />

          <BookCard
            cardStyle="bg-[#C75D2C] rounded-md pr-8 pl-2 py-4 text-white"
            book={myBooks[2]}
          />
        </>
      )}
    </section>
  );
};

export default BookList;
