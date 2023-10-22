import React from "react";
import PdfDownload from "./PdfDownload";
import Button from "../UIElements/Button";

const BookDetailed = (props) => {
  const { description, genre, language, pdf, isOnWishlist, setIsOnWishlist } =
    props;
  const user = JSON.parse(localStorage.getItem("userData"));

  return (
    <div>
      <p className="w-4/5 text-[#C75D2C] font-semibold mb-4">{description}</p>
      <p className="text-[#C75D2C]">
        Žanr: <span className="font-bold">{genre}</span>
      </p>
      <p className="text-[#C75D2C]">
        Jezik: <span className="font-bold">{language}</span>
      </p>
      {user && pdf && <PdfDownload pdf={pdf} />}
      {user && (
        <Button
          btnStyle="text-[#C75D2C] underline font-bold text-lg mt-3"
          btnText={`${
            isOnWishlist ? "Ukloni iz liste" : "Dodaj na listu"
          } želja`}
          onClick={setIsOnWishlist}
        />
      )}
    </div>
  );
};

export default BookDetailed;
