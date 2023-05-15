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

  console.log(myReservedBooks);

  return (
    <section className="p-12 bg-[#DDD] border border-[#C75D2C] h-[330px] opacity-90 overflow-y-scroll">
      {isLoading && <LoadingSpinner asOverlay />}
      {myReservations !== [] ? (
        <>
          <ReservationCard
            reservation={myReservations[0]}
            book={myReservedBooks[0]}
          />
          <ReservationCard
            reservation={myReservations[1]}
            book={myReservedBooks[1]}
          />
          <ReservationCard
            reservation={myReservations[2]}
            book={myReservedBooks[2]}
          />
        </>
      ) : (
        <p>Trenutno nema rezervisanih knjiga.</p>
      )}
    </section>
  );
};

export default CurrentReservations;
