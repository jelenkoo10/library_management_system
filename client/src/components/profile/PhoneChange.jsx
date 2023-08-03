import React, { useState, useContext } from "react";
import Input from "../../components/UIElements/Input";
import Button from "../../components/UIElements/Button";
import { useHttpClient } from "../../hooks/http-hook";
import { ModalContext } from "../../context/modal-context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../UIElements/LoadingSpinner/LoadingSpinner";

const PhoneChange = (props) => {
  let { handleModal } = React.useContext(ModalContext);
  const { oldPhone } = props;
  const [phoneNumber, setPhoneNumber] = useState({
    name: "",
    surname: "",
    phone: oldPhone,
  });
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const uid = JSON.parse(localStorage.getItem("userData")).userId;

  const updateName = async (e) => {
    e.preventDefault();
    async function changeName() {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/${uid}/data_update`,
          "PATCH",
          JSON.stringify(phoneNumber),
          {
            "Content-Type": "application/json",
          }
        );
        toast.success("Uspešno ste izmenili svoj broj telefona!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          bodyClassName: "toast",
        });
      } catch (err) {
        handleModal("Neuspešna promena podataka", error);
      }
    }

    changeName();
  };

  const phoneHandler = (e) => {
    setPhoneNumber((prevData) => {
      return { ...prevData, phone: e.target.value };
    });
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <form onSubmit={updateName} className="mx-auto">
        <>
          <Input
            inputId="phone"
            inputValue={phoneNumber.phone}
            inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[200px]"
            divStyle="flex justify-between items-center"
            labelStyle="text-2xl text-[#C75D2C] mr-6"
            inputType="text"
            inputLabel="Broj telefona "
            onChange={phoneHandler}
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

export default PhoneChange;
