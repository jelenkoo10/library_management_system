import React, { useState, useContext } from "react";
import Input from "../../components/UIElements/Input";
import Button from "../../components/UIElements/Button";
import { ModalContext } from "../../context/modal-context";
import { useHttpClient } from "../../hooks/http-hook";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../UIElements/LoadingSpinner/LoadingSpinner";

const PasswordChange = (props) => {
  const { mode } = props;
  let { handleModal } = React.useContext(ModalContext);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState({
    oldPassword: "",
    repeatedOldPassword: "",
    newPassword: "",
  });
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const uid = JSON.parse(localStorage.getItem("userData"))
    ? JSON.parse(localStorage.getItem("userData")).userId
    : null;

  const newPasswordHandler = (e) => {
    if (mode == "forgotten") {
      setEmail(e.target.value);
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
          `http://localhost:5000/api/users/reset_forgotten_password`,
          "PATCH",
          JSON.stringify({ email: email }),
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
      toast.success("Uspešno ste izmenili svoju lozinku!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        bodyClassName: "toast",
      });
      setTimeout(() => {
        window.location.reload();
      }, 3500);
    } catch (err) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        bodyClassName: "toast",
      });
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
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
            <Input
              inputId="newPassword"
              inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
              divStyle="flex justify-between items-center"
              labelStyle="text-2xl text-[#C75D2C] mr-6"
              inputType="password"
              inputLabel="Nova šifra "
              onChange={newPasswordHandler}
            />
          </>
        )}
        {mode == "forgotten" && (
          <Input
            inputId="email"
            inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
            divStyle="flex justify-between items-center"
            labelStyle="text-2xl text-[#C75D2C] mr-6"
            inputType="email"
            inputLabel="Vaša email adresa "
            onChange={newPasswordHandler}
          />
        )}
        <Button
          btnStyle="mt-5 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md"
          btnText={mode == "forgotten" ? "Pošalji mejl" : "Ažuriraj lozinku"}
          type="submit"
        />
      </form>
    </>
  );
};

export default PasswordChange;
