import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Button from "../UIElements/Button";

const AvailabilityCard = (props) => {
  const { title, authorName, branchName, status, id } = props;
  const auth = useContext(AuthContext);

  return (
    <Link to={`/book/${id}`} className="w-[600px] block mx-auto">
      <div className="w-[600px] bg-[#DDD] mx-auto my-4 text-[#C75D2C] p-4 border-2 border-[#C75D2C] rounded-md flex justify-between text-left">
        <div>
          <p className="font-bold">{title}</p>
          <p className="font-bold">{authorName}</p>
          <p>{branchName}</p>
        </div>
        <div>
          <p>{status}</p>
          {auth.isLoggedIn && status == "free" && (
            <Button
              btnStyle="p-2 mx-2 text-white bg-[#C75D2C] font-semibold opacity-100 rounded-md"
              btnText="Rezerviši"
              onClick={() => {}}
            />
          )}
        </div>
      </div>
    </Link>
  );
};

export default AvailabilityCard;
