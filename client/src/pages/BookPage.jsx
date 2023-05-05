import React from "react";
import BookDetailed from "../components/books/BookDetailed";
import BookInfo from "../components/books/BookInfo";
import AvailabilityTable from "../components/books/AvailabilityTable";

const BookPage = () => {
  return (
    <div className="flex bg-white opacity-80 w-3/4 mx-auto mt-10 p-8 rounded-lg">
      <div className="w-2/5">
        <BookInfo title="Hope to Die" author="James Patterson" />
        <BookDetailed />
      </div>
      <AvailabilityTable />
    </div>
  );
};

export default BookPage;
