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
  const [filterObject, setFilterObject] = useState({});
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

    async function getFilters() {
      const responseData = await sendRequest(
        `http://localhost:5000/api/books/filters`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      setFilterObject(responseData);
    }

    searchForBooks();
    getFilters();
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
      {
        <div className="fixed top-[4.95rem] left-0 bg-white w-[250px] bg-opacity-90 h-[89.5%] px-4 sm:hidden xl:block">
          <h1 className="text-2xl text-[#C75D2C] text-center mt-2">Filteri</h1>
          <Select
            selectStyle="my-4 block border-b-2 border-[#B8572A] xl:w-full"
            selectId="genre"
            selectName="genre"
            labelName="Žanr"
            labelStyle="text-lg text-[#C75D2C]"
            options={
              filterObject ? filterObject.genres : [{ id: "", name: "" }]
            }
            onChange={genreHandler}
          />
          <Select
            selectStyle="my-4 block border-b-2 border-[#B8572A] xl:w-full"
            selectId="language"
            selectName="language"
            labelName="Jezik"
            labelStyle="text-lg text-[#C75D2C]"
            options={
              filterObject ? filterObject.languages : [{ id: "", name: "" }]
            }
            onChange={languageHandler}
          />
          <Select
            selectStyle="my-4 block border-b-2 border-[#B8572A] xl:w-full"
            selectId="year_published"
            selectName="year_published"
            labelName="Godina izdanja"
            labelStyle="text-lg text-[#C75D2C]"
            options={[
              { id: "", name: "" },
              { id: "2022", name: "2022" },
              { id: "2021", name: "2021" },
              { id: "2020", name: "2020" },
              { id: "2019", name: "2019" },
              { id: "2018", name: "2018" },
              { id: "2017", name: "2017" },
              { id: "2016", name: "2016" },
              { id: "2015", name: "2015" },
              { id: "2014", name: "2014" },
              { id: "2013", name: "2013" },
              { id: "2012", name: "2012" },
              { id: "2011", name: "2011" },
              { id: "2010", name: "2010" },
              { id: "2009", name: "2009" },
              { id: "2008", name: "2008" },
              { id: "2007", name: "2007" },
              { id: "2006", name: "2006" },
              { id: "2005", name: "2005" },
              { id: "2004", name: "2004" },
              { id: "2003", name: "2003" },
              { id: "2002", name: "2002" },
              { id: "2001", name: "2001" },
              { id: "2000", name: "2000" },
              { id: "1999", name: "1999" },
              { id: "1998", name: "1998" },
              { id: "1997", name: "1997" },
              { id: "1996", name: "1996" },
              { id: "1995", name: "1995" },
              { id: "1994", name: "1994" },
              { id: "1993", name: "1993" },
              { id: "1992", name: "1992" },
              { id: "1991", name: "1991" },
              { id: "1990", name: "1990" },
              { id: "1989", name: "1989" },
              { id: "1988", name: "1988" },
              { id: "1987", name: "1987" },
              { id: "1986", name: "1986" },
              { id: "1985", name: "1985" },
              { id: "1984", name: "1984" },
              { id: "1983", name: "1983" },
              { id: "1982", name: "1982" },
              { id: "1981", name: "1981" },
              { id: "1980", name: "1980" },
              { id: "1979", name: "1979" },
              { id: "1978", name: "1978" },
              { id: "1977", name: "1977" },
              { id: "1976", name: "1976" },
              { id: "1975", name: "1975" },
            ]}
            onChange={yearHandler}
          />
          <Select
            selectStyle="my-4 block border-b-2 border-[#B8572A] xl:w-full"
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
      }
      <div className="py-5 px-14 mx-auto bg-white w-1/3 bg-opacity-80 mt-[30px] rounded-2xl sm:w-4/5 sm:rounded-lg sm:p-6 md:w-3/5 lg:w-1/2 lg:p-4">
        <h1 className="text-2xl text-[#C75D2C] mb-5 text-center">
          Pretraga knjiga
        </h1>
        <div className="flex justify-between">
          <Input
            inputId="title"
            inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[150px] sm:w-2/3"
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
      <div className="mt-4 text-center text-white h-[400px] overflow-y-scroll sm:h-[500px] lg:grid lg:grid-cols-2 lg:w-2/3 lg:mx-auto xl:w-1/2 xl:flex xl:flex-col">
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
