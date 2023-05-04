import React from "react";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";

const BookList = () => {
  return (
    <section className="p-12 bg-[#DDD] border border-[#C75D2C] opacity-90 grid grid-cols-2 gap-6 items-center">
      <Link to="../book/1">
        <BookCard
          cardStyle="bg-[#C75D2C] rounded-md pr-8 pl-2 py-4 text-white"
          title="Hope to Die"
          author="James Patterson"
          expiry_date="20.05.2023."
        />
      </Link>
      <Link to="../book/1">
        <BookCard
          cardStyle="bg-[#C75D2C] rounded-md pr-8 pl-2 py-4 text-white"
          title="Cross my Heart"
          author="James Patterson"
          expiry_date="20.05.2023."
        />
      </Link>
      <Link to="../book/1">
        <BookCard
          cardStyle="bg-[#C75D2C] rounded-md pr-8 pl-2 py-4 text-white"
          title="The Judgement"
          author="Ju Nesbe"
          expiry_date="20.05.2023."
        />
      </Link>
    </section>
  );
};

export default BookList;
