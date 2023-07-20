import { useEffect, useState, useContext } from "react";
import Button from "../UIElements/Button";
import Input from "../UIElements/Input";
import Select from "../UIElements/Select";
import ImageUpload from "../UIElements/ImageUpload";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminAddBookForm = ({ closeModal }) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
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

  const [inputData, setInputData] = useState({});
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
      formData.append("pdf", inputData.pdf);
      const responseData = await sendRequest(
        `http://localhost:5000/api/books`,
        "POST",
        formData
      );
      closeModal();
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
    } catch (err) {
      console.log(err);
      alert("Neuspešno dodavanje!", error);
    }
  };

  return (
    <form
      onSubmit={addBook}
      className="px-16 py-5 mx-auto bg-white mt-[20px] rounded-3xl flex justify-between w-full h-full gap-5 sm:p-2 sm:w-screen sm:rounded-lg sm:mx-0 sm:flex-col"
    >
      <div className="w-[45%] sm:w-full sm:flex sm:flex-col">
        <Input
          inputId="title"
          inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px] sm:w-1/2"
          divStyle="flex justify-between items-center sm:flex-col sm:items-start"
          labelStyle="text-2xl text-[#C75D2C]"
          inputType="text"
          inputLabel="Naslov "
          onChange={titleInputHandler}
        />
        <Input
          inputId="genre"
          inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px] sm:w-1/2"
          divStyle="flex justify-between items-center sm:flex-col sm:items-start"
          labelStyle="text-2xl text-[#C75D2C]"
          inputType="text"
          inputLabel="Zanr "
          onChange={genreInputHandler}
        />
        <Input
          inputId="year_published"
          inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px] sm:w-1/2"
          divStyle="flex justify-between items-center sm:flex-col sm:items-start"
          labelStyle="text-2xl text-[#C75D2C]"
          inputType="text"
          inputLabel="Godina "
          onChange={year_publishedInputHandler}
        />
        <Input
          inputId="language"
          inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px] sm:w-1/2"
          divStyle="flex justify-between items-center sm:flex-col sm:items-start"
          labelStyle="text-2xl text-[#C75D2C]"
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
        <Button
          btnStyle="mx-auto mt-10 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md hover:bg-[#D76D3C]"
          btnText="Dodaj knjigu"
        />
      </div>
      <div className="w-[45%] resize-none sm:w-full sm:flex sm:flex-col">
        <Select
          selectStyle="my-4 block border-b-2 border-[#B8572A] w-[200px] sm:w-1/2"
          selectId="author"
          selectName="author"
          labelName="Autor"
          labelStyle="text-2xl text-[#C75D2C]"
          options={authors}
          onChange={authorInputHandler}
          isAuthor
        />
        <Select
          selectStyle="my-4 block border-b-2 border-[#B8572A] w-[200px] sm:w-1/2"
          selectId="branch"
          selectName="branch"
          labelName="Ogranak"
          labelStyle="text-2xl text-[#C75D2C]"
          options={branches}
          onChange={branchInputHandler}
          isBranch
        />

        <div className="flex justify-between items-center sm:flex-col sm:items-start">
          <label
            htmlFor="description"
            className="text-2xl text-[#C75D2C] pt-[-80px]"
          >
            Opis
          </label>
          <textarea
            id="description"
            className="my-4 p-2 border-2 border-[#B8572A] focus:border w-[200px] sm:w-1/2 h-[150px] resize-none"
            type="text"
            onChange={descriptionInputHandler}
          ></textarea>
        </div>
      </div>
    </form>
  );
};

export default AdminAddBookForm;
