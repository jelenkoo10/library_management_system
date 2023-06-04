import React from "react";
import { Link } from "react-router-dom";
import ToggleFavorite from "../UIElements/ToggleFavorite";

const FavouriteBookCard = (props) => {
  const { book, cardStyle } = props;
  const userId = JSON.parse(localStorage.getItem("userData")).userId;

  return (
    <>
      {book && (
        <div className={cardStyle}>
          <div>
            <Link to={`/book/${book._id}`}>
              <h1 className="text-[#C75D2C] text-xl font-bold">{book.title}</h1>
            </Link>
            <p className="text-[#C75D2C] text-md font-semibold">
              {book.authorName}
            </p>
            {book.branchName && (
              <p className="text-[#C75D2C] text-sm">
                Ogranak: {book.branchName}
              </p>
            )}
          </div>
          <div className="w-1/9">
            <ToggleFavorite userId={userId} bookId={book._id} />
          </div>
        </div>
      )}
    </>
  );
};

export default FavouriteBookCard;
