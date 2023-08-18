import React from "react";
import AddComment from "./AddComment";
import { ModalContext } from "../../context/modal-context";
import { useEffect, useState } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import CommentCard from "./CommentCard";
import Button from "../UIElements/Button";
import LoadingSpinner from "../UIElements/LoadingSpinner/LoadingSpinner";

const BookComments = (props) => {
  const { book } = props;
  const [comments, setComments] = useState([]);
  let { handleModal } = React.useContext(ModalContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    async function getComments() {
      const responseData = await sendRequest(
        `http://localhost:5000/api/books/getcomments/${book.id}`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      setComments(responseData.comments);
    }

    getComments();
  }, []);

  return (
    <div className="w-3/5 sm:w-full lg:block lg:mt-8">
      {isLoading && <LoadingSpinner asOverlay />}
      {comments && comments.map((comment) => <CommentCard comment={comment} />)}
      {!comments[0] && (
        <p className="w-[600px] text-center font-semibold mx-auto my-6 text-[#C75D2C] rounded-md justify-between text-left sm:w-11/12 md:w-3/5 lg:w-[300px] lg:my-2 xl:w-[500px] xl:my-6 h-fit">
          Trenutno nema komentara za ovu knjigu.
        </p>
      )}
      <Button
        btnStyle="mx-auto mt-10 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md hover:bg-[#D76D3C]"
        btnText="Dodaj komentar"
        onClick={() =>
          handleModal("Dodavanje komentara", <AddComment bookId={book.id} />)
        }
      />
    </div>
  );
};

export default BookComments;
