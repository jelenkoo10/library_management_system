import React from "react";

const BookCard = (props) => {
  return (
    <div className="bg-[#C75D2C] rounded-md pr-8 pl-2 py-4 text-white">
      <h1 className="text-xl font-bold">{props.title}</h1>
      <p className="text-md font-semibold">{props.author}</p>
      <p className="text-sm">Rok isteka pozajmice: {props.expiry_date}</p>
    </div>
  );
};

export default BookCard;
