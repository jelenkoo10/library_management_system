import React from "react";
import Input from "../components/UIElements/Input";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../hooks/http-hook";
import Button from "../components/UIElements/Button";

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [bookResults, setBookResults] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const queryHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    async function searchForBooks() {
      const responseData = await sendRequest(
        `http://localhost:5000/api/books/search?searchquery=${searchQuery.toLowerCase()}`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      setBookResults(responseData);
    }

    searchForBooks();
  }, [isSearched]);

  return (
    <div className="px-10 py-20 mx-auto bg-white w-1/3 opacity-80 mt-[130px] rounded-3xl">
      <h1 className="text-4xl text-[#C75D2C] mb-5 text-center">
        Pretraga knjiga
      </h1>
      <Input
        inputId="title"
        inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
        divStyle="flex justify-between items-center"
        labelStyle="text-2xl text-[#C75D2C]"
        inputType="text"
        inputLabel="Knjiga ili autor "
        onChange={queryHandler}
      />
      {/* <Button
        btnStyle="mx-auto mt-10 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md"
        btnText="Prijavi se"
      /> */}
      <Button
        btnStyle="mx-auto mt-10 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md hover:bg-[#D76D3C]"
        onClick={() => {
          setIsSearched(true);
        }}
        btnText="Pretraži"
      />
    </div>
  );
};

export default SearchPage;
