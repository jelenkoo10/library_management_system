import React, { useEffect, useState, useContext } from "react";
import Button from "../components/UIElements/Button";
import Input from "../components/UIElements/Input";
import Select from "../components/UIElements/Select";
import ImageUpload from "../components/UIElements/ImageUpload";
import { useHttpClient } from "../hooks/http-hook";
import { ModalContext } from "../context/modal-context";
import { AuthContext } from "../context/auth-context";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  let { handleModal } = useContext(ModalContext);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({});
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
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
      setSelectedBranch(branches[0].id);
    }

    getBranches();
  }, []);

  console.log(inputData);

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

  const phoneInputHandler = (e) => {
    setInputData((oldData) => {
      return { ...oldData, phone: e.target.value };
    });
  };

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

  const branchInputHandler = (e) => {
    setInputData((oldData) => {
      return { ...oldData, branchId: e.target.value };
    });
  };

  const imageInputHandler = (value, isValid) => {
    if (isValid) {
      setInputData((oldData) => {
        return { ...oldData, image: value };
      });
    }
  };

  const signupUser = async (e) => {
    let responseData;
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", inputData.name);
      formData.append("surname", inputData.surname);
      formData.append("phone", inputData.phone);
      formData.append("email", inputData.email);
      formData.append("password", inputData.password);
      formData.append("branchId", inputData.branchId);
      formData.append("image", inputData.image);
      responseData = await sendRequest(
        "http://localhost:5000/api/users/signup",
        "POST",
        formData
      );
    } catch (err) {
      handleModal("Neuspešna registracija", error);
    }
    auth.login(
      responseData.userId,
      responseData.token,
      null,
      responseData.is_admin,
      responseData.name
    );
    navigate(`/profile/${responseData.userId}`);
  };

  return (
    <form
      encType="multipart/form-data"
      onSubmit={signupUser}
      className="px-10 py-12 mx-auto bg-white w-1/3 bg-opacity-80 mt-[15px] rounded-3xl"
    >
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
        inputId="phone"
        inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
        divStyle="flex justify-between items-center"
        labelStyle="text-2xl text-[#C75D2C]"
        inputType="text"
        inputLabel="Broj telefona "
        onChange={phoneInputHandler}
      />
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
      <Select
        selectStyle="my-4 block border-b-2 border-[#B8572A] w-[200px]"
        selectId="branch"
        selectName="branch"
        labelName="Ogranak"
        labelStyle="text-2xl text-[#C75D2C]"
        options={[{ name: "", id: "" }].concat(branches)}
        onChange={branchInputHandler}
      />
      <ImageUpload id="image" onInput={imageInputHandler} />
      <Button
        btnStyle="mx-auto mt-10 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md hover:bg-[#D76D3C]"
        btnText="Registruj se"
      />
    </form>
  );
};

export default Signup;
