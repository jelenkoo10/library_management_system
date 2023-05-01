import React from "react";
import Button from "../components/UIElements/Button";
import Input from "../components/UIElements/Input";

const Signup = () => {
  return (
    <form className="px-10 py-20 mx-auto bg-white w-1/3 opacity-80 mt-[60px] rounded-3xl">
      <Input
        inputId="name"
        inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
        labelStyle="text-2xl text-[#C75D2C]"
        inputType="text"
        inputLabel="Ime "
      />
      <Input
        inputId="surname"
        inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
        labelStyle="text-2xl text-[#C75D2C]"
        inputType="text"
        inputLabel="Prezime "
      />
      <Input
        inputId="phone"
        inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
        labelStyle="text-2xl text-[#C75D2C]"
        inputType="text"
        inputLabel="Broj telefona "
      />
      <Input
        inputId="email"
        inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
        labelStyle="text-2xl text-[#C75D2C]"
        inputType="email"
        inputLabel="Email adresa "
      />
      <Input
        inputId="password"
        inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
        labelStyle="text-2xl text-[#C75D2C]"
        inputType="password"
        inputLabel="Šifra "
      />
      <Input
        inputId="branchId"
        inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
        labelStyle="text-2xl text-[#C75D2C]"
        inputType="text"
        inputLabel="Ogranak "
      />
      <Button
        btnStyle="mx-auto mt-10 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md"
        btnText="Registruj se"
      />
    </form>
  );
};

export default Signup;
