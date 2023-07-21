import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../hooks/http-hook";
import LoadingSpinner from "../UIElements/LoadingSpinner/LoadingSpinner";
import Input from "../UIElements/Input";
import Button from "../UIElements/Button";
import ReservationCard from "./ReservationCard";

const ReservationsHistory = () => {
  const [allReservations, setAllReservations] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    bookName: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { uid } = useParams();

  console.log(allReservations);

  useEffect(() => {
    async function getAllReservations() {
      const responseData = await sendRequest(
        `http://localhost:5000/api/users/reservations/${uid}?startdate=${filters.startDate}&enddate=${filters.endDate}&bookname=${filters.bookName}`,
        "GET",
        null,
        { "Content-Type": "application/json" }
      );
      setAllReservations(responseData.reservations);
      setAllBooks(responseData.books);
    }

    getAllReservations();
  }, [isSubmitted]);

  const filterStartDateHandler = (e) => {
    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        startDate: e.target.value,
      };
    });
  };

  const filterEndDateHandler = (e) => {
    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        endDate: e.target.value,
      };
    });
  };

  const filterBookNameHandler = (e) => {
    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        bookName: e.target.value,
      };
    });
  };

  return (
    <section className="bg-white bg-opacity-80 px-12 pb-12 pt-6 border border-[#B8572A] h-[439px] w-[900px] sm:w-full md:h-[600px]">
      {isLoading && <LoadingSpinner asOverlay />}
      <h1 className="text-2xl font-semibold text-[#C75D2C] mb-2 text-center">
        Filteri
      </h1>
      <p className="text-md text-[#C75D2C] mb-2 text-center">
        Neophodno je uneti oba datuma, inače pretraga neće raditi.
      </p>
      <form
        className="mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
          setIsSubmitted((prev) => !prev);
        }}
      >
        <div className="flex w-4/5 justify-around mx-auto sm:flex-col sm:items-start md:flex-row md:justify-between">
          <Input
            inputId="bookName"
            inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[140px] sm:w-full md:w-10/12"
            divStyle="flex items-center sm:flex-col sm:mx-auto"
            labelStyle="text-lg text-[#C75D2C] mr-2 sm:m-0 sm:text-center"
            inputType="text"
            inputLabel="Ime knjige "
            onChange={filterBookNameHandler}
          />
          <Input
            inputId="startDate"
            inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[100px] sm:w-full md:w-10/12"
            divStyle="flex items-center sm:flex-col sm:mx-auto"
            labelStyle="text-lg text-[#C75D2C] ml-8 mr-2 sm:m-0 sm:text-center"
            inputType="text"
            inputLabel="Početni datum "
            onChange={filterStartDateHandler}
          />
          <Input
            inputId="endDate"
            inputStyle="my-4 block border-b-2 border-[#B8572A] focus:border w-[100px] sm:w-full md:w-10/12"
            divStyle="flex items-center sm:flex-col sm:mx-auto"
            labelStyle="text-lg text-[#C75D2C] ml-8 mr-2 sm:m-0 sm:text-center"
            inputType="text"
            inputLabel="Krajnji datum "
            onChange={filterEndDateHandler}
          />
        </div>
        <Button
          btnStyle="mx-auto mt-2 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md"
          btnText="Pretraži"
          type="submit"
        />
      </form>
      <div className="mt-6 mx-auto flex flex-col items-center overflow-y-scroll h-[200px] md:h-[250px]">
        {allReservations &&
          allReservations.map((reservation, i) => (
            <ReservationCard reservation={reservation} book={allBooks[i]} />
          ))}
      </div>
    </section>
  );
};

export default ReservationsHistory;
