import React, { useState } from "react";
import Modal from "../UIElements/Modal";

const ProfileUpdate = (props) => {
  const [showModal, setShowModal] = useState(false);
  const { name, surname, phone, email } = props;

  const handleOnClose = () => {
    setShowModal(false);
  };

  return (
    <section className="p-12 bg-[#DDD] border border-[#C75D2C] text-[#C75D2C] opacity-90">
      <h1 className="font-bold text-xl text-center">
        Informacije o Vašem profilu
      </h1>
      <div className="mb-4 mt-6 flex justify-between items-center">
        <p className="text-lg font-bold">
          {name} {surname}
        </p>
        <div>Izmeni</div>
      </div>
      <p className="text-md mb-4">Email adresa: {email}</p>
      <div className="my-4 flex justify-between items-center">
        <p className="text-md">Broj telefona: {phone}</p>
        <div>Izmeni</div>
      </div>
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
