import React from "react";
import Input from "../UIElements/Input";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";

const SearchResults = () => {
  return (
    <>
      <div className="absolute top-[4.25rem] left-0 bg-white w-[250px] opacity-80 h-[91%]">
        <h1 className="text-2xl text-[#C75D2C] text-center mt-2">Filteri</h1>
        
      </div>
      <div className="py-5 px-14 mx-auto bg-white w-1/2 opacity-80 mt-[30px] rounded-2xl">
        <h1 className="text-2xl text-[#C75D2C] mb-5 text-center">
          Pretraga knjiga
        </h1>
        <div className="flex justify-between">
          <Input
            inputId="title"
            inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[150px]"
            labelStyle="text-xl text-[#C75D2C] mr-5"
            inputType="text"
            inputLabel="Knjiga "
          />
          <Input
            inputId="author"
            inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[150px] ml-5"
            labelStyle="text-xl text-[#C75D2C]"
            inputType="text"
            inputLabel="Autor "
          />
        </div>
        {/* <Button
        btnStyle="mx-auto mt-10 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md"
        btnText="Prijavi se"
      /> */}
        <NavLink
          to="results"
          className="mx-auto mt-2 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md max-w-fit"
          btnText="Prijavi se"
        >
          Pretraži
        </NavLink>
      </div>
      <div className="grid grid-cols-2 gap-6 items-center w-1/2 mx-auto mt-10">
        <Link to="../book/1">
          <BookCard
            cardStyle="bg-white text-[#C75D2C] rounded-md pr-8 pl-2 py-4 opacity-80"
            title="Hope to Die"
            author="James Patterson"
            expiry_date=""
          />
        </Link>
        <Link to="../book/1">
          <BookCard
            cardStyle="bg-white text-[#C75D2C] rounded-md pr-8 pl-2 py-4 opacity-80"
            title="Cross my Heart"
            author="James Patterson"
            expiry_date=""
          />
        </Link>
        <Link to="../book/1">
          <BookCard
            cardStyle="bg-white text-[#C75D2C] rounded-md pr-8 pl-2 py-4 opacity-80"
            title="The Judgement"
            author="Ju Nesbe"
            expiry_date=""
          />
        </Link>
      </div>
    </>
  );
};

export default SearchResults;
