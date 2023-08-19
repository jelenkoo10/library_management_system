import { useEffect, useState } from "react";
import Button from "../UIElements/Button";
import Input from "../UIElements/Input";
import Select from "../UIElements/Select";
import { useHttpClient } from "../../hooks/http-hook";
import ImageUpload from "../UIElements/ImageUpload";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../UIElements/LoadingSpinner/LoadingSpinner";

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

  const imageInputHandler = (value, isValid) => {
    if (isValid) {
      setInputData((oldData) => {
        return { ...oldData, image: value };
      });
    }
  };

  const updateBook = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("title", inputData.title);
      formData.append("genre", inputData.genre);
      formData.append("language", inputData.language);
      formData.append("description", inputData.description);
      formData.append("year_published", inputData.year_published);
      formData.append("authorId", inputData.authorId);
      formData.append("branchId", inputData.branchId);
      formData.append("pdf", inputData.pdf);
      formData.append("image", inputData.image);
      const responseData = await sendRequest(
        `http://localhost:5000/api/books/${book._id}`,
        "PATCH",
        formData
      );
      toast.success("Uspešno ste izmenili knjigu!", {
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
      alert("Neuspešna izmena", error);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <form
        onSubmit={updateBook}
        className="p-4 mx-auto bg-white flex justify-between sm:w-3/4 sm:p-4 sm:rounded-lg sm:mx-0 sm:flex-col"
      >
        <div className="w-[45%] sm:w-full sm:flex sm:flex-col lg:w-[500px]">
          <Input
            inputId="title"
            inputStyle="my-2 block border-b-2 border-[#B8572A] focus:border w-[200px] sm:w-1/2"
            divStyle="flex justify-between items-center"
            labelStyle="text-2xl text-[#C75D2C]"
            inputType="text"
            inputLabel="Naslov "
            onChange={titleInputHandler}
            value={inputData.title}
          />
          <Input
            inputId="genre"
            inputStyle="my-2 block border-b-2 border-[#B8572A] focus:border w-[200px] sm:w-1/2"
            divStyle="flex justify-between items-center"
            labelStyle="text-2xl text-[#C75D2C]"
            inputType="text"
            inputLabel="Zanr "
            onChange={genreInputHandler}
            value={inputData.genre}
          />
          <Input
            inputId="year_published"
            inputStyle="my-2 block border-b-2 border-[#B8572A] focus:border w-[200px] sm:w-1/2"
            divStyle="flex justify-between items-center"
            labelStyle="text-2xl text-[#C75D2C]"
            inputType="text"
            inputLabel="Godina "
            onChange={year_publishedInputHandler}
            value={inputData.year_published}
          />
          <Input
            inputId="language"
            inputStyle="my-2 block border-b-2 border-[#B8572A] focus:border w-[200px] sm:w-1/2"
            divStyle="flex justify-between items-center"
            labelStyle="text-2xl text-[#C75D2C]"
            inputType="text"
            inputLabel="Jezik "
            onChange={languageInputHandler}
            value={inputData.language}
          />
          <ImageUpload
            id="pdf"
            label="PDF knjige"
            extensions=".pdf"
            onInput={pdfInputHandler}
          />
          <ImageUpload
            id="image"
            label="Slika knjige"
            extensions=".jpg, .jpeg, .png"
            onInput={imageInputHandler}
          />
        </div>
        <div className="w-[45%] resize-none sm:w-full sm:flex sm:flex-col lg:w-[500px]">
          <Select
            selectStyle="my-2 block border-b-2 border-[#B8572A] w-[200px] sm:w-1/2"
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
            selectStyle="my-2 block border-b-2 border-[#B8572A] w-[200px] sm:w-1/2"
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
              className="my-2 p-2 border-2 border-[#B8572A] focus:border w-[200px] sm:w-3/4 h-[150px] resize-none"
              type="text"
              onChange={descriptionInputHandler}
              value={inputData.description}
            ></textarea>
          </div>
          <Button
            btnStyle="mx-auto mt-10 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md hover:bg-[#D76D3C]"
            btnText="Izmeni knjigu"
          />
        </div>
      </form>
    </>
  );
};

export default AdminBookUpdateModal;
