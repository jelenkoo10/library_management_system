import { useEffect, useState, useContext } from "react";
import Button from "../UIElements/Button";
import Input from "../UIElements/Input";
import Select from "../UIElements/Select";
import ImageUpload from "../UIElements/ImageUpload";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";
import LoadingSpinner from "../UIElements/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminAddBookForm = ({ closeModal }) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [inputData, setInputData] = useState({});
  const [authors, setAuthors] = useState([]);
  const [branches, setBranches] = useState([]);

  const auth = useContext(AuthContext);
  const userId = auth.isLoggedIn
    ? JSON.parse(localStorage.getItem("userData")).userId
    : null;

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
    async function fetchBranch() {
      const response = await sendRequest(
        `http://localhost:5000/api/users/branches/${userId}`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      setBranches(response.branches);
    }
    fetchBranch();
    fetchAuthors();
  }, []);

  useEffect(() => {
    if (branches.length > 0 && authors.length > 0) {
      setInputData({ branchId: branches[0]._id, authorId: authors[0].id });
    }
  }, [branches, authors]);

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
      return { ...oldData, authorId: e.target.value };
    });
  };

  const languageInputHandler = (e) => {
    setInputData((oldData) => {
      return { ...oldData, language: e.target.value };
    });
  };

  const branchInputHandler = (e) => {
    setInputData((oldData) => {
      return { ...oldData, branchId: e.target.value };
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

  const addBook = async (e) => {
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
      formData.append("image", inputData.image);
      formData.append("pdf", inputData.pdf);
      const responseData = await sendRequest(
        `http://localhost:5000/api/books`,
        "POST",
        formData
      );
      toast.success("Uspešno ste dodali knjigu!", {
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
      alert("Neuspešno dodavanje!", error);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <form
        onSubmit={addBook}
        encType="multipart/form-data"
        className="p-4 mx-auto bg-white flex justify-between sm:w-3/4 sm:p-2 sm:rounded-lg sm:mx-0 sm:flex-col"
      >
        <div className="w-[45%] sm:w-full sm:flex sm:flex-col lg:w-[500px]">
          <Input
            inputId="title"
            inputStyle="my-1 block border-b-2 border-[#B8572A] focus:border w-[200px] sm:w-1/2"
            divStyle="flex justify-between items-center"
            labelStyle="text-xl text-[#C75D2C]"
            inputType="text"
            inputLabel="Naslov "
            onChange={titleInputHandler}
          />
          <Input
            inputId="genre"
            inputStyle="my-1 block border-b-2 border-[#B8572A] focus:border w-[200px] sm:w-1/2"
            divStyle="flex justify-between items-center"
            labelStyle="text-xl text-[#C75D2C]"
            inputType="text"
            inputLabel="Zanr "
            onChange={genreInputHandler}
          />
          <Input
            inputId="year_published"
            inputStyle="my-1 block border-b-2 border-[#B8572A] focus:border w-[200px] sm:w-1/2"
            divStyle="flex justify-between items-center"
            labelStyle="text-xl text-[#C75D2C]"
            inputType="text"
            inputLabel="Godina "
            onChange={year_publishedInputHandler}
          />
          <Input
            inputId="language"
            inputStyle="my-1 block border-b-2 border-[#B8572A] focus:border w-[200px] sm:w-1/2"
            divStyle="flex justify-between items-center"
            labelStyle="text-xl text-[#C75D2C]"
            inputType="text"
            inputLabel="Jezik "
            onChange={languageInputHandler}
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
            selectStyle="my-1 block border-b-2 border-[#B8572A] w-[200px] sm:w-1/2"
            selectId="author"
            selectName="author"
            labelName="Autor"
            labelStyle="text-xl text-[#C75D2C]"
            options={authors}
            onChange={authorInputHandler}
            isAuthor
          />
          <Select
            selectStyle="my-1 block border-b-2 border-[#B8572A] w-[200px] sm:w-1/2"
            selectId="branch"
            selectName="branch"
            labelName="Ogranak"
            labelStyle="text-xl text-[#C75D2C]"
            options={branches}
            onChange={branchInputHandler}
            isBranch
          />

          <div className="flex justify-between items-center sm:w-full">
            <label
              htmlFor="description"
              className="text-xl text-[#C75D2C] pt-[-80px]"
            >
              Opis
            </label>
            <textarea
              id="description"
              className="my-1 p-2 border-2 border-[#B8572A] focus:border w-[200px] sm:w-3/4 h-[100px] resize-none"
              type="text"
              onChange={descriptionInputHandler}
            ></textarea>
          </div>
          <Button
            btnStyle="mx-auto mt-4 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md hover:bg-[#D76D3C]"
            btnText="Dodaj knjigu"
          />
        </div>
      </form>
    </>
  );
};

export default AdminAddBookForm;
