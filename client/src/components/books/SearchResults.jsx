import React from "react";
import Input from "../UIElements/Input";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useHttpClient } from "../../hooks/http-hook";
import Button from "../UIElements/Button";
import AvailabilityCard from "./AvailabilityCard";
import LoadingSpinner from "../UIElements/LoadingSpinner/LoadingSpinner";

const SearchResults = () => {
  const location = useLocation();
  const { state } = location;
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(state.query);
  const [isSearched, setIsSearched] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  console.log(searchQuery);
  const queryHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    async function searchForBooks() {
      const responseData = await sendRequest(
        `http://localhost:5000/api/books/search?searchquery=${searchQuery}`,
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
        `http://localhost:5000/api/books/search?searchquery=${searchQuery}`,
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
      <div className="absolute top-[4.25rem] left-0 bg-white w-[250px] bg-opacity-80 h-[91%]">
        <h1 className="text-2xl text-[#C75D2C] text-center mt-2">Filteri</h1>
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
