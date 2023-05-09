import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Input from "../UIElements/Input";

const ReservationsHistory = () => {
  const [allReservations, setAllReservations] = useState([]);

  useEffect(() => {
    async function getAllReservations() {
      const response = await fetch(
        "http://localhost:5000/api/users/reservations/644506351bd88b2d9ccd80c0?startDate=&endDate="
      );
      const data = await response.json();
      console.log(data);
    }

    getAllReservations();
  }, []);

  return (
    <section className="bg-white opacity-80 p-12 border-[#B8572A]">
      <h1 className="text-2xl font-semibold text-[#C75D2C] mb-5 text-center">
        Filteri
      </h1>
      <div className="flex">
        <Input
          inputId="bookName"
          inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[140px]"
          divStyle="flex items-center"
          labelStyle="text-lg text-[#C75D2C] mr-2"
          inputType="text"
          inputLabel="Ime knjige "
        />
        <Input
          inputId="startDate"
          inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[100px]"
          divStyle="flex items-center"
          labelStyle="text-lg text-[#C75D2C] ml-8 mr-2"
          inputType="text"
          inputLabel="Početni datum "
        />
        <Input
          inputId="endDate"
          inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[100px]"
          divStyle="flex items-center"
          labelStyle="text-lg text-[#C75D2C] ml-8 mr-2"
          inputType="text"
          inputLabel="Krajnji datum "
        />
      </div>
    </section>
  );
};

export default ReservationsHistory;
