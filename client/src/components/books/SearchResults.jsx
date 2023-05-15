import React from "react";
import Input from "../UIElements/Input";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useHttpClient } from "../../hooks/http-hook";
import Select from "../UIElements/Select";
import Button from "../UIElements/Button";
import AvailabilityCard from "./AvailabilityCard";
import LoadingSpinner from "../UIElements/LoadingSpinner/LoadingSpinner";

const SearchResults = () => {
  const location = useLocation();
  const { state } = location;
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(state.query);
  const [filters, setFilters] = useState({
    genre: "",
    language: "",
    status: "",
    year_published: "",
  });
  const [isSearched, setIsSearched] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const queryHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  const genreHandler = (e) => {
    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        genre: e.target.value,
      };
    });
  };

  const languageHandler = (e) => {
    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        language: e.target.value,
      };
    });
  };

  const yearHandler = (e) => {
    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        year_published: e.target.value,
      };
    });
  };

  const statusHandler = (e) => {
    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        status: e.target.value,
      };
    });
  };

  useEffect(() => {
    async function searchForBooks() {
      const responseData = await sendRequest(
        `http://localhost:5000/api/books/search?searchquery=${searchQuery}&genre=${filters.genre}&language=${filters.language}&status=${filters.status}&year=${filters.year_published}`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      setBooks(responseData.books);
    }

    searchForBooks();
  }, []);

  useEffect(() => {
    async function searchForBooks() {
      const responseData = await sendRequest(
        `http://localhost:5000/api/books/search?searchquery=${searchQuery}&genre=${filters.genre}&language=${filters.language}&status=${filters.status}&year=${filters.year_published}`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      setBooks(responseData.books);
    }

    if (isSearched) {
      searchForBooks();
      setIsSearched(false);
    }
  }, [isSearched]);

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="absolute top-[5rem] left-0 bg-white w-[250px] bg-opacity-80 h-[91%] px-4">
        <h1 className="text-2xl text-[#C75D2C] text-center mt-2">Filteri</h1>
        <Select
          selectStyle="my-4 block border-b-2 border-[#B8572A] w-[100px]"
          selectId="genre"
          selectName="genre"
          labelName="Žanr"
          labelStyle="text-lg text-[#C75D2C]"
          options={[
            { id: "", name: "" },
            { id: "kriminalistika", name: "kriminalistika" },
            { id: "roman", name: "roman" },
            { id: "horor", name: "horor" },
          ]}
          onChange={genreHandler}
        />
        <Select
          selectStyle="my-4 block border-b-2 border-[#B8572A] w-[100px]"
          selectId="language"
          selectName="language"
          labelName="Jezik"
          labelStyle="text-lg text-[#C75D2C]"
          options={[
            { id: "", name: "" },
            { id: "engleski", name: "engleski" },
            { id: "roman", name: "roman" },
            { id: "horor", name: "horor" },
          ]}
          onChange={languageHandler}
        />
        <Select
          selectStyle="my-4 block border-b-2 border-[#B8572A] w-[100px]"
          selectId="year_published"
          selectName="year_published"
          labelName="Godina izdanja"
          labelStyle="text-lg text-[#C75D2C]"
          options={[
            { id: "", name: "" },
            { id: "2013", name: "2013" },
            { id: "2012", name: "2012" },
            { id: "2011", name: "2011" },
            { id: "2010", name: "2010" },
            { id: "2009", name: "2009" },
            { id: "2008", name: "2008" },
            { id: "2007", name: "2007" },
            { id: "2006", name: "2006" },
            { id: "2005", name: "2005" },
          ]}
          onChange={yearHandler}
        />
        <Select
          selectStyle="my-4 block border-b-2 border-[#B8572A] w-[100px]"
          selectId="status"
          selectName="status"
          labelName="Dostupnost"
          labelStyle="text-lg text-[#C75D2C]"
          options={[
            { id: "", name: "" },
            { id: "slobodno", name: "slobodno" },
            { id: "zauzeto", name: "zauzeto" },
            { id: "rezervisano", name: "rezervisano" },
          ]}
          onChange={statusHandler}
        />
        <Button
          onClick={() => {
            setIsSearched(true);
          }}
          btnText="Primeni filtere"
          btnStyle="mx-auto mt-2 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md max-w-fit"
        />
      </div>
      <div className="py-5 px-14 mx-auto bg-white w-1/3 bg-opacity-80 mt-[30px] rounded-2xl">
        <h1 className="text-2xl text-[#C75D2C] mb-5 text-center">
          Pretraga knjiga
        </h1>
        <div className="flex justify-between">
          <Input
            inputId="title"
            inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[150px]"
            divStyle="flex items-center mx-auto"
            labelStyle="text-xl text-[#C75D2C] mr-5"
            inputType="text"
            inputLabel="Knjiga ili autor "
            onChange={queryHandler}
          />
        </div>
        {/* <Button
        btnStyle="mx-auto mt-10 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md"
        btnText="Prijavi se"
      /> */}
        <Button
          onClick={() => {
            setIsSearched(true);
          }}
          btnText="Pretraži"
          btnStyle="mx-auto mt-2 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md max-w-fit"
        />
      </div>
      <div className="text-center text-white">
        {books &&
          books.map((book) => (
            <AvailabilityCard
              id={book.id}
              title={book.title}
              authorName={book.authorName}
              branchName={book.branchName}
              status={book.status}
            />
          ))}
      </div>
    </>
  );
};

export default SearchResults;
