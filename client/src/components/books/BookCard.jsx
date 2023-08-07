import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WarningIcon from "../../assets/warning.png";
import DueIcon from "../../assets/past-due.png";

const BookCard = (props) => {
  const { book, cardStyle, withStatus } = props;
  const [bookStatus, setBookStatus] = useState("success");

  function getDaysDifference(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    return Math.round((firstDate - secondDate) / oneDay);
  }

  useEffect(() => {
    if (withStatus) {
      const currentDate = new Date().toISOString().slice(0, 10);
      const daysDifference = getDaysDifference(
        book.loan_expiry.slice(0, 10),
        currentDate
      );

      if (daysDifference < 0) {
        setBookStatus("error");
      } else if (daysDifference < 10) {
        setBookStatus("warning");
      } else {
        setBookStatus("success");
      }
    }
  }, []);

  return (
    <>
      {book && (
        <Link to={`/book/${book._id}`}>
          <div className={cardStyle}>
            <div className="flex justify-between">
              <h1 className="text-[#C75D2C] text-xl font-bold">{book.title}</h1>
              {bookStatus == "error" ? (
                <img
                  src={DueIcon}
                  alt="Error icon"
                  width="30px"
                  height="20px"
                />
              ) : bookStatus == "warning" ? (
                <img
                  src={WarningIcon}
                  alt="Warning icon"
                  width="30px"
                  height="20px"
                />
              ) : null}
            </div>
            <p className="text-[#C75D2C] text-md font-semibold">
              {book.authorName}
            </p>
            {book.loan_expiry && (
              <p className="text-[#C75D2C] text-sm">
                Rok isteka pozajmice: {book.loan_expiry.slice(0, 10)}
              </p>
            )}
            {book.branchName && (
              <p className="text-[#C75D2C] text-sm">
                Ogranak: {book.branchName}
              </p>
            )}
          </div>
        </Link>
      )}
    </>
  );
};

export default BookCard;
