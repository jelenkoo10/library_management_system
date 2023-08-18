import React, { useState, useContext } from "react";
import Input from "../../components/UIElements/Input";
import Button from "../../components/UIElements/Button";
import { useHttpClient } from "../../hooks/http-hook";
import { ModalContext } from "../../context/modal-context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../UIElements/LoadingSpinner/LoadingSpinner";

const NameChange = (props) => {
  let { handleModal } = React.useContext(ModalContext);
  const { oldName, oldSurname } = props;
  const [fullName, setFullName] = useState({
    name: oldName,
    surname: oldSurname,
    phone: "",
  });
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const uid = JSON.parse(localStorage.getItem("userData")).userId;

  const updateName = async (e) => {
    e.preventDefault();
    async function changeName() {
      if (fullName.name !== "" && fullName.surname !== "") {
        try {
          const responseData = await sendRequest(
            `http://localhost:5000/api/users/${uid}/data_update`,
            "PATCH",
            JSON.stringify(fullName),
            {
              "Content-Type": "application/json",
            }
          );
          toast.success("Uspešno ste izmenili svoje ime i prezime!", {
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
          handleModal("Neuspešna promena podataka", error);
        }
      } else {
        alert("Polje za ime ili prezime je prazno!");
      }
    }

    changeName();
  };

  const nameHandler = (e) => {
    setFullName((prevData) => {
      return { ...prevData, name: e.target.value };
    });
  };

  const surnameHandler = (e) => {
    setFullName((prevData) => {
      return { ...prevData, surname: e.target.value };
    });
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <form onSubmit={updateName} className="mx-auto">
        <>
          <Input
            inputId="name"
            inputValue={fullName.name}
            inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
            divStyle="flex justify-between items-center"
            labelStyle="text-2xl text-[#C75D2C] mr-6"
            inputType="text"
            inputLabel="Ime "
            onChange={nameHandler}
          />
          <Input
            inputId="surname"
            inputValue={fullName.surname}
            inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
            divStyle="flex justify-between items-center"
            labelStyle="text-2xl text-[#C75D2C] mr-6"
            inputType="text"
            inputLabel="Prezime "
            onChange={surnameHandler}
          />
        </>
        <Button
          btnStyle="mt-5 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md"
          btnText="Izmeni"
          type="submit"
        />
      </form>
    </>
  );
};

export default NameChange;
