import React from "react";
import { Link } from "react-router-dom";

const BookCard = (props) => {
  const { book, cardStyle } = props;
  return (
    <>
      {book && (
        <Link to={`/book/${book.id}`}>
          <div className={cardStyle}>
            <h1 className="text-xl font-bold">{book.title}</h1>
            <p className="text-md font-semibold">{book.authorName}</p>
            {book.loan_expiry && (
              <p className="text-sm">
                Rok isteka pozajmice: {book.loan_expiry}
              </p>
            )}
            {book.branchName && (
              <p className="text-sm">Ogranak: {book.branchName}</p>
            )}
          </div>
        </Link>
      )}
    </>
  );
};

export default BookCard;
