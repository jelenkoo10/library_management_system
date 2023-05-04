import React from "react";

const BookCard = (props) => {
  return (
    <div className={props.cardStyle}>
      <h1 className="text-xl font-bold">{props.title}</h1>
      <p className="text-md font-semibold">{props.author}</p>
      {props.expiry_date && (
        <p className="text-sm">Rok isteka pozajmice: {props.expiry_date}</p>
      )}
    </div>
  );
};

export default BookCard;
