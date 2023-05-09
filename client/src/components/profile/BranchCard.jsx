import React from "react";

const BranchCard = (props) => {
  const { branch } = props;

  return (
    <div className="border border-[#C75D2C] rounded-md p-4 text-white flex justify-between w-[420px]">
      <div>
        <h1 className="text-[#C75D2C] font-bold">
          {branch.name}, {branch.city}
        </h1>
        <p className="text-[#C75D2C] text-sm my-0">{branch.address}</p>
        <p className="text-[#C75D2C] text-sm my-0">{branch.worktime}</p>
      </div>
      <img
        width="64px"
        src={require("../../assets/icons8-library-building-50.png")}
        alt="A library icon"
      />
    </div>
  );
};

export default BranchCard;
