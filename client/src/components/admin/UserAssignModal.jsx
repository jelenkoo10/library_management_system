import { useState } from "react";
import close from "../../assets/close.png";
import Select from "../UIElements/Select";
import LoadingSpinner from "../UIElements/LoadingSpinner/LoadingSpinner";
import { useEffect } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import Button from "../UIElements/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserAssignModal = ({ closeModal, user }) => {
  const { sendRequest, isLoading } = useHttpClient();
  const [inputData, setInputData] = useState({});
  const [books, setBooks] = useState();

  console.log(user);

  const assignBook = async (e) => {
    e.preventDefault();
    console.log(inputData);
    const response = await sendRequest(
      `http://localhost:5000/api/books/assign/${inputData.booksId}`,
      "PATCH",
      {
        userId: user.id,
      },
      {
        "Content-Type": "application/json",
      }
    );
    closeModal();
    toast.success("Uspešno ste dodelili knjigu!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      bodyClassName: "toast",
    });
    console.log(response);
  };

  const booksInputHandler = (e) => {
    setInputData((oldData) => {
      return { ...oldData, booksId: e.target.value };
    });
  };

  useEffect(() => {
    async function fetchBooks() {
      let booksArray = [];
      const response = await sendRequest(
        `http://localhost:5000/api/users/branches/${user._id}`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      for (let branch of response.branches) {
        const responseData = await sendRequest(
          `http://localhost:5000/api/books/branch/${branch._id}`,
          "GET",
          null,
          {
            "Content-Type": "application/json",
          }
        );
        responseData.books
          .filter((book) => {
            return book.status === "slobodno";
          })
          .map((book) => booksArray.push({ name: book.title, id: book._id }));
      }
      setBooks(booksArray);
      setInputData((oldData) => {
        return { ...oldData, booksId: booksArray[0] && booksArray[0].id };
      });
    }
    fetchBooks();
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <form
        onSubmit={assignBook}
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
          btnText="Upiši knjigu"
        />
      </form>
    </>
  );
};

export default UserAssignModal;
