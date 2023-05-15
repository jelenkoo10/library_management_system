import React from "react";

const BookInfo = (props) => {
  const { title, authorName, year_published } = props;
  return (
    <div className="mb-8 text-[#C75D2C] bg-[#DDD] p-4 border-2 border-[#C75D2C] rounded-md w-4/5">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-lg font-bold">{authorName}</p>
      <p className="text-md font-semibold">
        Godina izdavanja: {year_published}
      </p>
    </div>
  );
};

export default BookInfo;
