import React from "react";
import PdfDownload from "./PdfDownload";

const BookDetailed = (props) => {
  const { description, genre, language, pdf } = props;
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
      {user && pdf ? !user.is_admin && <PdfDownload pdf={pdf} /> : null}
    </div>
  );
};

export default BookDetailed;
