import React from "react";

const BookInfo = (props) => {
  const { title, author } = props;
  return (
    <div className="mb-8 text-[#C75D2C]">
      <h1>{title}</h1>
      <p>{author}</p>
    </div>
  );
};

export default BookInfo;
