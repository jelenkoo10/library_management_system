import React from "react";
import { Link } from "react-router-dom";

const ReservationCard = (props) => {
  const { reservation, book } = props;
  return (
    <>
      {book && (
        <div className="bg-[#DDD] sm:w-[280px] md:w-[450px] text-white my-4 p-2 sm:flex sm:flex-col md:flex-row items-center justify-between rounded-lg border border-[#C75D2C]">
          <Link to={`/book/${book._id}`}>
            <h1 className="text-[#C75D2C] font-bold text-md">{book.title}</h1>
            <p className="text-[#C75D2C] font-bold text-sm">
              {book.authorName}
            </p>
            <p className="text-[#C75D2C] text-sm">{book.branchName}</p>
          </Link>
          <div>
            <p className="text-[#C75D2C]">
              Datum rezervacije: {reservation.reservationDate.slice(0, 10)}
            </p>
            <p className="text-[#C75D2C]">
              Datum vraćanja: {reservation.returnDate.slice(0, 10)}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ReservationCard;
