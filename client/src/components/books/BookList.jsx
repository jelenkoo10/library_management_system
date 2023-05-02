import React from "react";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";

const BookList = () => {
  return (
    <section className="p-12 bg-[#DDD] border border-[#C75D2C] opacity-90 grid grid-cols-2 gap-6 items-center">
      <Link to="../book/1">
        <BookCard
          title="Hope to Die"
          author="James Patterson"
          expiry_date="20.05.2023."
        />
      </Link>
      <Link to="../book/1">
        <BookCard
          title="Cross my Heart"
          author="James Patterson"
          expiry_date="20.05.2023."
        />
      </Link>
      <Link to="../book/1">
        <BookCard
          title="The Judgement"
          author="Ju Nesbe"
          expiry_date="20.05.2023."
        />
      </Link>
    </section>
  );
};

export default BookList;
