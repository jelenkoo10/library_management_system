import React, { useState } from "react";
import Modal from "../UIElements/Modal";

const ProfileUpdate = (props) => {
  const [showModal, setShowModal] = useState(false);
  const { name, surname, phone, email } = props;

  const handleOnClose = () => {
    setShowModal(false);
  };

  return (
    <section className="pl-12 pr-24 py-6 bg-[#DDD] border border-[#C75D2C] text-[#C75D2C] opacity-90">
      <h1 className="font-bold text-xl text-center">
        Informacije o Vašem profilu
      </h1>
      <p className="text-lg mb-4 mt-6 font-bold">
        {name} {surname}
      </p>
      <p className="text-lg mb-4">Email adresa: {email}</p>
      <p className="text-lg mb-4">Broj telefona: {phone}</p>
      <div
        className="bg-[#C75D2C] rounded-sm px-4 py-2 mt-4 text-white block"
        onClick={() => setShowModal(true)}
      >
        Zaboravili ste lozinku?
      </div>
      <div
        className="bg-[#C75D2C] rounded-sm px-4 py-2 mt-4 text-white block"
        onClick={() => setShowModal(true)}
      >
        Želite da promenite lozinku?
      </div>
      <Modal visible={showModal} onClose={handleOnClose} />
    </section>
  );
};

export default ProfileUpdate;
