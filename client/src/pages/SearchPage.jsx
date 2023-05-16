import React from "react";
import Input from "../components/UIElements/Input";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const queryHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="px-10 py-20 mx-auto bg-white w-1/3 bg-opacity-80 mt-[130px] rounded-3xl">
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
      <NavLink
        to="/results"
        className="mx-auto mt-10 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md max-w-fit hover:bg-[#D76D3C]"
        state={{ query: searchQuery }}
      >
        Pretraži
      </NavLink>
    </div>
  );
};

export default SearchPage;
