import { useState } from "react";
import close from "../../assets/close.png";
import Select from "../UIElements/Select";
import { useEffect } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import Button from "../UIElements/Button";

const UserAssignModal = ({ closeModal, user }) => {
  const { sendRequest } = useHttpClient();
  const [inputData, setInputData] = useState({});
  const [books, setBooks] = useState();

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
        `http://localhost:5000/api/users/branches/${user.id}`,
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
        responseData.books.map((book) =>
          booksArray.push({ name: book.title, id: book._id })
        );
      }
      setBooks(booksArray);
    }
    fetchBooks();
  }, []);

  //   useEffect(() => {
  //     if (books.length > 0) {
  //       setInputData({ booksId: books[0].id });
  //     }
  //   }, [books]);

  return (
    <div className="z-5000 absolute w-[58vw] h-[60%] top-[20%] left-[21vw]">
      <div
        className="w-[20px] h-[20px] absolute top-[50px] right-[40px] cursor-pointer"
        onClick={closeModal}
      >
        <img src={close} alt="close" className="w-full h-full" />
      </div>
      <form
        onSubmit={assignBook}
        className="px-10 py-16 mx-auto bg-white mt-[20px] rounded-3xl"
      >
        <Select
          selectStyle="my-4 block border-b-2 border-[#B8572A] w-[200px]"
          selectId="books"
          selectName="books"
          labelName="Knjiga"
          labelStyle="text-2xl text-[#C75D2C]"
          options={books}
          onChange={booksInputHandler}
        />
        <Button
          btnStyle="mx-auto mt-10 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md hover:bg-[#D76D3C]"
          btnText="Upisi Knjigu"
        />
      </form>
    </div>
  );
};

export default UserAssignModal;