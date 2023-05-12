import React, { useEffect } from "react";
import { useState } from "react";
import Button from "../components/UIElements/Button";
import Input from "../components/UIElements/Input";
import Select from "../components/UIElements/Select";
import { useHttpClient } from "../hooks/http-hook";

const Signup = () => {
  const [branches, setBranches] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    async function getBranches() {
      const responseData = await sendRequest(
        "http://localhost:5000/api/branches",
        "GET",
        null,
        { "Content-Type": "application/json" }
      );
      setBranches(
        responseData.branches.map((branch) => {
          return {
            name: branch.name + ", " + branch.city,
            id: branch.id,
          };
        })
      );
    }

    getBranches();
  }, []);

  return (
    <form className="px-10 py-16 mx-auto bg-white w-1/3 bg-opacity-80 mt-[20px] rounded-3xl">
      <Input
        inputId="name"
        inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
        divStyle="flex justify-between items-center"
        labelStyle="text-2xl text-[#C75D2C]"
        inputType="text"
        inputLabel="Ime "
      />
      <Input
        inputId="surname"
        inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
        divStyle="flex justify-between items-center"
        labelStyle="text-2xl text-[#C75D2C]"
        inputType="text"
        inputLabel="Prezime "
      />
      <Input
        inputId="phone"
        inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
        divStyle="flex justify-between items-center"
        labelStyle="text-2xl text-[#C75D2C]"
        inputType="text"
        inputLabel="Broj telefona "
      />
      <Input
        inputId="email"
        inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
        divStyle="flex justify-between items-center"
        labelStyle="text-2xl text-[#C75D2C]"
        inputType="email"
        inputLabel="Email adresa "
      />
      <Input
        inputId="password"
        inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
        divStyle="flex justify-between items-center"
        labelStyle="text-2xl text-[#C75D2C]"
        inputType="password"
        inputLabel="Šifra "
      />
      <Select
        selectStyle="my-4 block border-b-2 border-[#B8572A] w-[200px]"
        selectId="branch"
        selectName="branch"
        labelName="Ogranak"
        labelStyle="text-2xl text-[#C75D2C]"
        options={branches}
      />
      <Button
        btnStyle="mx-auto mt-10 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md hover:bg-[#D76D3C]"
        btnText="Registruj se"
      />
    </form>
  );
};

export default Signup;
