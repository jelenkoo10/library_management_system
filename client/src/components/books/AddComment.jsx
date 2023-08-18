import React from "react";
import { useState, useContext } from "react";
import Button from "../UIElements/Button";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";
import LoadingSpinner from "../UIElements/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddComment = (props) => {
  const { bookId } = props;
  const [comment, setComment] = useState("");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const userId = auth.isLoggedIn
    ? JSON.parse(localStorage.getItem("userData")).userId
    : null;

  const commentInputHandler = (e) => {
    setComment(e.target.value);
  };

  const addComment = async (e) => {
    try {
      e.preventDefault();
      const responseData = await sendRequest(
        `http://localhost:5000/api/books/comment/${bookId}`,
        "PATCH",
        JSON.stringify({
          comment: comment,
          userId: userId,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      toast.success("Uspešno ste dodali komentar.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        bodyClassName: "toast",
      });
      setTimeout(() => {
        window.location.reload();
      }, 3500);
    } catch (err) {
      console.log(err);
      toast.error("Neuspešno dodavanje komentara.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        bodyClassName: "toast",
      });
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <form onSubmit={addComment} className="flex flex-col">
        <label htmlFor="commentText" className="text-2xl text-[#C75D2C]">
          Komentar
        </label>
        <textarea
          name="commentText"
          id="commentText"
          type="text"
          className="my-4 p-2 border-2 border-[#B8572A] focus:border w-[350px] h-[200px] resize-none"
          onChange={commentInputHandler}
        ></textarea>
        <Button
          btnStyle="w-3/5 mt-10 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md hover:bg-[#D76D3C]"
          btnText="Dodaj komentar"
        />
      </form>
    </>
  );
};

export default AddComment;
