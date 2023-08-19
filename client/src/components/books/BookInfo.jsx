import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ModalContext } from "../../context/modal-context";
import AuthorCard from "../authors/AuthorCard";
import ToggleFavorite from "../UIElements/ToggleFavorite";

const BookInfo = (props) => {
  const { title, authorName, year_published, author, likedBy, image } = props;
  const { handleModal } = useContext(ModalContext);
  const { bid } = useParams();
  const user = JSON.parse(localStorage.getItem("userData"));

  return (
    <div className="flex justify-between items-start mb-8 text-[#C75D2C] bg-[#DDD] p-4 border-2 border-[#C75D2C] rounded-md w-4/5 lg:w-1/2">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p
          className="text-lg font-bold cursor-pointer hover:underline"
          onClick={() =>
            handleModal("O autoru", <AuthorCard authorId={author} />)
          }
        >
          {authorName}
        </p>
        <p className="text-md font-semibold">
          Godina izdavanja: {year_published}
        </p>
      </div>
      <img src={image} alt="Book's image" />
      {user
        ? !user.is_admin && (
            <ToggleFavorite
              userId={user.userId}
              bookId={bid}
              likedBy={likedBy}
            />
          )
        : null}
    </div>
  );
};

export default BookInfo;
