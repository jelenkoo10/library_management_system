import React, { useState } from "react";
import Button from "../components/UIElements/Button";
import Input from "../components/UIElements/Input";
import { useHttpClient } from "../hooks/http-hook";

const Login = () => {
  const [inputData, setInputData] = useState({});
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const emailInputHandler = (e) => {
    setInputData((oldData) => {
      return { ...oldData, email: e.target.value };
    });
  };

  const passwordInputHandler = (e) => {
    setInputData((oldData) => {
      return { ...oldData, password: e.target.value };
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const responseData = await sendRequest(
      "http://localhost:5000/api/users/login",
      "POST",
      JSON.stringify(inputData),
      {
        "Content-Type": "application/json",
      }
    );
    console.log(responseData);
  };

  return (
    <form
      onSubmit={loginUser}
      className="px-10 py-20 mx-auto bg-white w-1/3 bg-opacity-80 mt-[150px] rounded-3xl"
    >
      <Input
        inputId="email"
        inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
        divStyle="flex justify-between items-center"
        labelStyle="text-2xl text-[#C75D2C]"
        inputType="email"
        inputLabel="Email adresa "
        onChange={emailInputHandler}
      />
      <Input
        inputId="password"
        inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
        divStyle="flex justify-between items-center"
        labelStyle="text-2xl text-[#C75D2C]"
        inputType="password"
        inputLabel="Šifra "
        onChange={passwordInputHandler}
      />
      <Button
        btnStyle="mx-auto mt-10 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md"
        btnText="Prijavi se"
        type="submit"
      />
      {/* <NavLink
        to="/profile/1"
        className="mx-auto mt-10 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md max-w-fit hover:bg-[#D76D3C]"
        btnText="Prijavi se"
      >
        Prijavi se
      </NavLink> */}
    </form>
  );
};

export default Login;
