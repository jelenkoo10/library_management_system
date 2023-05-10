import React from "react";

const BookDetailed = (props) => {
  const { description, genre, language } = props;
  return (
    <div>
      <p className="w-4/5 text-[#C75D2C] font-semibold mb-4">{description}</p>
      <p className="text-[#C75D2C]">
        Žanr: <span className="font-bold">{genre}</span>
      </p>
      <p className="text-[#C75D2C]">
        Jezik: <span className="font-bold">{language}</span>
      </p>
    </div>
  );
};

export default BookDetailed;
