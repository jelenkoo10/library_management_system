import React from "react";
import { Link } from "react-router-dom";

const AvailabilityCard = (props) => {
  const { title, authorName, branchName, status, id } = props;

  return (
    <Link to={`/book/${id}`}>
      <div className="w-[600px] bg-[#DDD] mx-auto my-4 text-[#C75D2C] p-4 border-2 border-[#C75D2C] rounded-md flex justify-between">
        <div>
          <p className="font-bold">
            {title}, {authorName}
          </p>
          <p className="text-left">{branchName}</p>
        </div>
        <div>
          <p>{status}</p>
        </div>
      </div>
    </Link>
  );
};

export default AvailabilityCard;
