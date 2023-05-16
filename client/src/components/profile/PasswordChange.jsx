import React, { useState, useContext } from "react";
import Input from "../../components/UIElements/Input";
import Button from "../../components/UIElements/Button";
import { ModalContext } from "../../context/modal-context";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../../hooks/http-hook";

const PasswordChange = (props) => {
  const { mode } = props;
  let { handleModal } = React.useContext(ModalContext);
  // const navigate = useNavigate();
  const [forgottenPassword, setForgottenPassword] = useState({
    password: "",
  });
  const [password, setPassword] = useState({
    oldPassword: "",
    repeatedOldPassword: "",
    newPassword: "",
  });
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const uid = JSON.parse(localStorage.getItem("userData")).userId;

  const newPasswordHandler = (e) => {
    if (mode == "forgotten") {
      setForgottenPassword((prevData) => {
        return { ...prevData, password: e.target.value };
      });
    } else {
      setPassword((prevData) => {
        return { ...prevData, newPassword: e.target.value };
      });
    }
  };

  const oldPasswordHandler = (e) => {
    setPassword((prevData) => {
      return { ...prevData, oldPassword: e.target.value };
    });
  };

  const repeatedOldPasswordHandler = (e) => {
    setPassword((prevData) => {
      return { ...prevData, repeatedOldPassword: e.target.value };
    });
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      if (mode == "forgotten") {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/${uid}/reset_forgotten_password`,
          "PATCH",
          forgottenPassword,
          {
            "Content-Type": "application/json",
          }
        );
      } else {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/${uid}/reset_password`,
          "PATCH",
          JSON.stringify(password),
          {
            "Content-Type": "application/json",
          }
        );
      }
    } catch (err) {
      handleModal("Neuspešna promena lozinke", error);
    }
  };

  return (
    <form onSubmit={updatePassword} className="mx-auto">
      {mode == "change" && (
        <>
          <Input
            inputId="oldPassword"
            inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
            divStyle="flex justify-between items-center"
            labelStyle="text-2xl text-[#C75D2C] mr-6"
            inputType="password"
            inputLabel="Stara šifra "
            onChange={oldPasswordHandler}
          />
          <Input
            inputId="repeatedOldPassword"
            inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
            divStyle="flex justify-between items-center"
            labelStyle="text-2xl text-[#C75D2C] mr-6"
            inputType="password"
            inputLabel="Stara šifra, ponovljena "
            onChange={repeatedOldPasswordHandler}
          />
        </>
      )}
      <Input
        inputId="newPassword"
        inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
        divStyle="flex justify-between items-center"
        labelStyle="text-2xl text-[#C75D2C] mr-6"
        inputType="password"
        inputLabel="Nova šifra "
        onChange={newPasswordHandler}
      />
      <Button
        btnStyle="mt-5 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md"
        btnText="Izmeni"
        type="submit"
      />
    </form>
  );
};

export default PasswordChange;
