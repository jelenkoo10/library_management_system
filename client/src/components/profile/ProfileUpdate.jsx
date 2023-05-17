import React, { useEffect, useState, useContext } from "react";
import { ModalContext } from "../../context/modal-context";
import PasswordChange from "./PasswordChange";
import NameChange from "./NameChange";
import PhoneChange from "./PhoneChange";
import { useHttpClient } from "../../hooks/http-hook";
import PenIcon from "../../assets/pen_icon.png";
import LoadingSpinner from "../UIElements/LoadingSpinner/LoadingSpinner";

const ProfileUpdate = (props) => {
  let { handleModal } = React.useContext(ModalContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const uid = JSON.parse(localStorage.getItem("userData")).userId;
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function getUserData() {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/id/${uid}`,
          "GET",
          null,
          { "Content-Type": "application/json" }
        );
        setUserData(responseData.user);
      } catch (err) {}
    }

    getUserData();
  }, []);

  return (
    <section className="p-12 bg-[#DDD] border border-[#C75D2C] text-[#C75D2C] bg-opacity-90 w-[900px]">
      {isLoading && <LoadingSpinner asOverlay />}
      <h1 className="font-bold text-xl">Informacije o Vašem profilu</h1>
      <div className="mb-4 mt-6 flex justify-between items-center w-2/5">
        <p className="text-lg font-bold">
          {userData.name} {userData.surname}
        </p>
        <img
          src={PenIcon}
          alt="A pen icon"
          width="24px"
          height="24px"
          className="cursor-pointer"
          onClick={() =>
            handleModal(
              "Promena imena i prezimena",
              <NameChange
                oldName={userData.name}
                oldSurname={userData.surname}
              />
            )
          }
        />
      </div>
      <p className="text-md mb-4 w-2/5">Email adresa: {userData.email}</p>
      <div className="my-4 flex justify-between items-center w-2/5">
        <p className="text-md">Broj telefona: {userData.phone}</p>
        <img
          src={PenIcon}
          alt="A pen icon"
          width="24px"
          height="24px"
          className="cursor-pointer"
          onClick={() =>
            handleModal(
              "Promena broja telefona",
              <PhoneChange oldPhone={userData.phone} />
            )
          }
        />
      </div>
      <div
        className="bg-[#C75D2C] rounded-md cursor-pointer px-4 py-2 mt-4 text-white block w-2/5"
        onClick={() =>
          handleModal("Promena lozinke", <PasswordChange mode="change" />)
        }
      >
        Želite da promenite lozinku?
      </div>
    </section>
  );
};

export default ProfileUpdate;
