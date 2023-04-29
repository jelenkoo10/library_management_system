import React from "react";
import Button from "./Button";
import Input from "./Input";

const Login = () => {
  return (
    <form className="px-10 py-20 mx-auto bg-white w-1/3 opacity-80 mt-[150px] rounded-3xl">
      <Input
        inputId="username"
        inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
        labelStyle="text-2xl text-[#C75D2C]"
        inputType="text"
        inputLabel="Korisničko ime "
      />
      <Input
        inputId="password"
        inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
        labelStyle="text-2xl text-[#C75D2C]"
        inputType="password"
        inputLabel="Šifra "
      />
      <Button
        btnStyle="mx-auto mt-10 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md"
        btnText="Prijavi se"
      />
    </form>
  );
};

export default Login;
