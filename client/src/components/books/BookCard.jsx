import React from "react";
import { Link } from "react-router-dom";

const BookCard = (props) => {
  const { book, cardStyle } = props;

  return (
    <>
      {book && (
        <Link to={`/book/${book._id}`}>
          <div className={cardStyle}>
            <h1 className="text-[#C75D2C] text-xl font-bold">{book.title}</h1>
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
        </Link>
      )}
    </>
  );
};

export default BookCard;
