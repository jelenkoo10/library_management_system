import { useEffect, useState } from "react";
import Button from "../UIElements/Button";
import Input from "../UIElements/Input";
import Select from "../UIElements/Select";
import { useHttpClient } from "../../hooks/http-hook";
import ImageUpload from "../UIElements/ImageUpload";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import close from "../../assets/close.png";

const AdminBookUpdateModal = ({ book, branches, stopUpdating, reloadPage }) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [authors, setAuthors] = useState(null);

  useEffect(() => {
    async function fetchAuthors() {
      const responseData = await sendRequest(
        "http://localhost:5000/api/authors",
        "GET",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      setAuthors(responseData.authors);
    }
    fetchAuthors();
  }, []);

  const [inputData, setInputData] = useState({
    title: book.title,
    genre: book.genre,
    description: book.description,
    language: book.language,
    year_published: book.year_published,
    // authorId,
    // branchId,
    author: book.author,
    branch: book.branch,
  });

  console.log(inputData);

  const titleInputHandler = (e) => {
    setInputData((oldData) => {
      return { ...oldData, title: e.target.value };
    });
  };

  const genreInputHandler = (e) => {
    setInputData((oldData) => {
      return { ...oldData, genre: e.target.value };
    });
  };

  const descriptionInputHandler = (e) => {
    setInputData((oldData) => {
      return { ...oldData, description: e.target.value };
    });
  };

  const year_publishedInputHandler = (e) => {
    setInputData((oldData) => {
      return { ...oldData, year_published: e.target.value };
    });
  };

  const authorInputHandler = (e) => {
    setInputData((oldData) => {
      return { ...oldData, author: e.target.value };
    });
  };

  const languageInputHandler = (e) => {
    setInputData((oldData) => {
      return { ...oldData, language: e.target.value };
    });
  };

  const branchInputHandler = (e) => {
    setInputData((oldData) => {
      return { ...oldData, branch: e.target.value };
    });
  };

  const pdfInputHandler = (value, isValid) => {
    if (isValid) {
      setInputData((oldData) => {
        return { ...oldData, pdf: value };
      });
    }
  };

  const updateBook = async (e) => {
    try {
      e.preventDefault();
      const responseData = await sendRequest(
        `http://localhost:5000/api/books/${book._id}`,
        "PATCH",
        JSON.stringify(inputData),
        {
          "Content-Type": "application/json",
        }
      );
      stopUpdating();
      reloadPage();
      toast.success("Uspešno ste izmenili knjigu!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        bodyClassName: "toast"
      });
    } catch (err) {
      console.log(err);
      alert("Neuspešna izmena", error);
    }
  };

  return (
    <div className="z-5000 absolute w-[58vw] h-[60%] top-[20%] left-[21vw]">
      <div
        className="w-[20px] h-[20px] absolute top-[50px] right-[40px] cursor-pointer"
        onClick={stopUpdating}
      >
        <img src={close} alt="close" className="w-full h-full" />
      </div>
      <form
        onSubmit={updateBook}
        className="px-10 py-16 mx-auto bg-white mt-[20px] rounded-3xl flex justify-between w-full h-full gap-5"
      >
        <div className="w-[45%]">
          <Input
            inputId="title"
            inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
            divStyle="flex justify-between items-center"
            labelStyle="text-2xl text-[#C75D2C]"
            inputType="text"
            inputLabel="Naslov "
            onChange={titleInputHandler}
            value={inputData.title}
          />
          <Input
            inputId="genre"
            inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
            divStyle="flex justify-between items-center"
            labelStyle="text-2xl text-[#C75D2C]"
            inputType="text"
            inputLabel="Zanr "
            onChange={genreInputHandler}
            value={inputData.genre}
          />
          <Input
            inputId="year_published"
            inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
            divStyle="flex justify-between items-center"
            labelStyle="text-2xl text-[#C75D2C]"
            inputType="text"
            inputLabel="Godina "
            onChange={year_publishedInputHandler}
            value={inputData.year_published}
          />
          <Input
            inputId="language"
            inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
            divStyle="flex justify-between items-center"
            labelStyle="text-2xl text-[#C75D2C]"
            inputType="text"
            inputLabel="Jezik "
            onChange={languageInputHandler}
            value={inputData.language}
          />
          <ImageUpload
            id="book-pdf"
            label="PDF knjige"
            extensions=".pdf"
            onInput={pdfInputHandler}
          />
          <Button
            btnStyle="mx-auto mt-10 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md hover:bg-[#D76D3C]"
            btnText="Izmeni knjigu"
          />
        </div>
        <div className="w-[45%] resize-none">
          <Select
            selectStyle="my-4 block border-b-2 border-[#B8572A] w-[200px]"
            selectId="author"
            selectName="author"
            labelName="Autor"
            labelStyle="text-2xl text-[#C75D2C]"
            options={authors}
            onChange={authorInputHandler}
            isAuthor
            value={inputData.author}
          />
          <Select
            selectStyle="my-4 block border-b-2 border-[#B8572A] w-[200px]"
            selectId="branch"
            selectName="branch"
            labelName="Ogranak"
            labelStyle="text-2xl text-[#C75D2C]"
            options={branches}
            onChange={branchInputHandler}
          />

          <div className="flex justify-between items-center">
            <label
              htmlFor="description"
              className="text-2xl text-[#C75D2C] pt-[-80px]"
            >
              Opis
            </label>
            <textarea
              id="description"
              className="my-4 p-2 border-2 border-[#B8572A] focus:border w-[200px] h-[150px] resize-none"
              type="text"
              onChange={descriptionInputHandler}
              value={inputData.description}
            ></textarea>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminBookUpdateModal;
