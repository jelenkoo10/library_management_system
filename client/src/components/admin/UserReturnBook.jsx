import { useState } from "react";
import close from "../../assets/close.png";
import Select from "../UIElements/Select";
import { useEffect } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import Button from "../UIElements/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserReturnBook = ({ user, closeModal }) => {
  const { sendRequest } = useHttpClient();
  const [inputData, setInputData] = useState({});
  const [books, setBooks] = useState();

  const returnBook = async (e) => {
    e.preventDefault();
    const response = await sendRequest(
      `http://localhost:5000/api/books/return/${inputData.booksId}`,
      "PATCH",
      JSON.stringify({
        userId: user.id,
      }),
      {
        "Content-Type": "application/json",
      }
    );
    toast.success("Uspešno je vraćena knjiga!", {
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
  };

  const booksInputHandler = (e) => {
    setInputData((oldData) => {
      return { ...oldData, booksId: e.target.value };
    });
  };

  useEffect(() => {
    async function fetchBooks() {
      let booksArray = [];
      const responseData = await sendRequest(
        `http://localhost:5000/api/books/${user._id}/books`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      responseData.books
        .filter((book) => {
          return book.user == user._id;
        })
        .map((book) => booksArray.push({ name: book.title, id: book._id }));
      setBooks(booksArray);
      setInputData((oldData) => {
        return { ...oldData, booksId: booksArray[0] && booksArray[0].id };
      });
    }
    fetchBooks();
  }, []);

  console.log(inputData);
  return (
    <form
      onSubmit={returnBook}
      className="p-4 mx-auto bg-white flex justify-between sm:w-3/4 sm:p-4 sm:rounded-lg sm:mx-0 sm:flex-col"
    >
      <Select
        selectStyle="my-4 block border-b-2 border-[#B8572A] w-[300px]"
        selectId="books"
        selectName="books"
        labelName="Knjiga"
        labelStyle="text-2xl text-[#C75D2C] mr-6 mt-2"
        options={books}
        onChange={booksInputHandler}
      />
      <Button
        btnStyle="mx-auto mt-10 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md hover:bg-[#D76D3C]"
        btnText="Vrati knjigu"
      />
    </form>
  );
};

export default UserReturnBook;
