import { useState } from "react";
import Button from "../UIElements/Button";
import Input from "../UIElements/Input";
import { useHttpClient } from "../../hooks/http-hook";

const AdminAddAuthorForm = ({ closeModal }) => {
  const { error, sendRequest } = useHttpClient();
  const [inputData, setInputData] = useState({});

  const nameInputHandler = (e) => {
    setInputData((oldData) => {
      return { ...oldData, name: e.target.value };
    });
  };

  const surnameInputHandler = (e) => {
    setInputData((oldData) => {
      return { ...oldData, surname: e.target.value };
    });
  };

  const biographyInputHandler = (e) => {
    setInputData((oldData) => {
      return { ...oldData, biography: e.target.value };
    });
  };

  const date_of_birthInputHandler = (e) => {
    setInputData((oldData) => {
      return { ...oldData, date_of_birth: e.target.value };
    });
  };

  const nationalityInputHandler = (e) => {
    setInputData((oldData) => {
      return { ...oldData, nationality: e.target.value };
    });
  };

  const ageInputHandler = (e) => {
    setInputData((oldData) => {
      return { ...oldData, age: parseInt(e.target.value) };
    });
  };

  const addAuthor = async (e) => {
    try {
      e.preventDefault();
      console.log(inputData);
      const responseData = await sendRequest(
        `http://localhost:5000/api/authors`,
        "POST",
        JSON.stringify(inputData),
        {
          "Content-Type": "application/json",
        }
      );

      closeModal();
    } catch (err) {
      console.log(err);
      alert("Neuspešna izmena", error);
    }
  };

  return (
    <form
      onSubmit={addAuthor}
      className="px-10 py-16 mx-auto bg-white mt-[20px] rounded-3xl flex justify-between w-full h-full gap-5"
    >
      <div className="w-[45%]">
        <Input
          inputId="name"
          inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
          divStyle="flex justify-between items-center"
          labelStyle="text-2xl text-[#C75D2C]"
          inputType="text"
          inputLabel="Ime "
          onChange={nameInputHandler}
        />
        <Input
          inputId="surname"
          inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
          divStyle="flex justify-between items-center"
          labelStyle="text-2xl text-[#C75D2C]"
          inputType="text"
          inputLabel="Prezime "
          onChange={surnameInputHandler}
        />
        <Input
          inputId="date_of_birth"
          inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
          divStyle="flex justify-between items-center"
          labelStyle="text-2xl text-[#C75D2C]"
          inputType="date"
          inputLabel="Godina rodjenja "
          onChange={date_of_birthInputHandler}
        />
        <Button
          btnStyle="mx-auto mt-10 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md hover:bg-[#D76D3C]"
          btnText="Dodaj pisca"
        />
      </div>{" "}
      <div className="w-[45%]">
        <Input
          inputId="nationality"
          inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
          divStyle="flex justify-between items-center"
          labelStyle="text-2xl text-[#C75D2C]"
          inputType="text"
          inputLabel="Nacionalnost "
          onChange={nationalityInputHandler}
        />
        <Input
          inputId="age"
          inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
          divStyle="flex justify-between items-center"
          labelStyle="text-2xl text-[#C75D2C]"
          inputType="text"
          inputLabel="Godine "
          onChange={ageInputHandler}
        />
        <div className="flex justify-between items-center">
          <label
            htmlFor="biography"
            className="text-2xl text-[#C75D2C] pt-[-80px]"
          >
            Biografija
          </label>
          <textarea
            id="biography"
            className="my-4 p-2 border-2 border-[#B8572A] focus:border w-[200px] h-[150px] resize-none"
            type="text"
            onChange={biographyInputHandler}
          ></textarea>
        </div>
      </div>
    </form>
  );
};

export default AdminAddAuthorForm;
