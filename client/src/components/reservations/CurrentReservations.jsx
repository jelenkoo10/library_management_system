import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../hooks/http-hook";
import ReservationCard from "./ReservationCard";
import LoadingSpinner from "../UIElements/LoadingSpinner/LoadingSpinner";

const CurrentReservations = () => {
  const [myReservations, setMyReservations] = useState([]);
  const [myReservedBooks, setMyReservedBooks] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { uid } = useParams();

  useEffect(() => {
    async function getReservations() {
      const responseData = await sendRequest(
        `http://localhost:5000/api/users/reservations/current/${uid}`,
        "GET",
        null,
        { "Content-Type": "application/json" }
      );
      setMyReservations(responseData.reservations);
      setMyReservedBooks(responseData.books);
    }
    getReservations();
  }, []);

  return (
    <section className="p-12 bg-[#DDD] border border-[#C75D2C] lg:w-[900px] xl:w-[1000px] opacity-90 sm:w-full xl:p-8">
      {isLoading && <LoadingSpinner asOverlay />}
      <>
        {myReservations &&
          myReservations.map((reservation, i) => (
            <ReservationCard
              reservation={reservation}
              book={myReservedBooks[i]}
            />
          ))}
      </>
      {!myReservations[0] && (
        <p className="text-[#C75D2C] text-lg font-bold">
          Trenutno nema rezervisanih knjiga.
        </p>
      )}
    </section>
  );
};

export default CurrentReservations;
