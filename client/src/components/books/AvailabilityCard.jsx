import React from "react";

const AvailabilityCard = (props) => {
  const { title, authorName, branchName, status } = props;

  return (
    <div className="w-7/8 mb-4 text-[#C75D2C] p-4 border-2 border-[#C75D2C] rounded-md flex justify-between">
      <div>
        <p className="font-bold">
          {title}, {authorName}
        </p>
        <p>{branchName}</p>
      </div>
      <div>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default AvailabilityCard;
