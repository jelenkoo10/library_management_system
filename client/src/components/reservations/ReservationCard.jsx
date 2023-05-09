import React from "react";
import { Link } from "react-router-dom";

const ReservationCard = (props) => {
  const { reservation, book } = props;
  return (
    <>
      {book && (
        <div className="bg-[#C75D2C] w-[400px] text-white my-4 p-2 flex items-center justify-around rounded-lg">
          <Link to={`/book/${book._id}`}>
            <h1>{book.title}</h1>
          </Link>
          <div>
            <p>Datum rezervacije: {reservation.reservationDate.slice(0, 10)}</p>
            <p>Datum vraćanja: {reservation.returnDate.slice(0, 10)}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ReservationCard;
