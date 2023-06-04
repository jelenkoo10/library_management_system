import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Button from "../UIElements/Button";
import LoadingSpinner from "../UIElements/LoadingSpinner/LoadingSpinner";
import { ModalContext } from "../../context/modal-context";
import { useHttpClient } from "../../hooks/http-hook";

const AvailabilityCard = (props) => {
  let { handleModal } = React.useContext(ModalContext);
  const auth = useContext(AuthContext);
  const { title, authorName, branchName, status, id } = props;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const uid = auth.isLoggedIn
    ? JSON.parse(localStorage.getItem("userData")).userId
    : null;

  const reservationHandler = async () => {
    try {
      let responseData = await sendRequest(
        `http://localhost:5000/api/books/reserve/${id}`,
        "PATCH",
        JSON.stringify({ userId: uid }),
        { "Content-Type": "application/json" }
      );
      console.log(responseData);
      window.location.reload();
    } catch (err) {
      handleModal(
        "Neuspešna rezervacija",
        error ||
          "Došlo je do greške, knjiga ne može biti rezervisana. Proverite da li već imate 3 rezervisane knjige."
      );
    }
  };

  return (
    <div className="w-[600px] bg-[#DDD] mx-auto my-4 text-[#C75D2C] p-4 border-2 border-[#C75D2C] rounded-md flex justify-between text-left">
      <div>
        <Link to={`/book/${id}`}>
          <p className="font-bold">{title}</p>
          <p className="font-bold">{authorName}</p>
          <p>{branchName}</p>
        </Link>
      </div>
      <div className="flex flex-col items-center">
        <p>{status}</p>
        {auth.isLoggedIn && status == "slobodno" && (
          <>
            {isLoading && <LoadingSpinner asOverlay />}
            <Button
              btnStyle="p-2 mx-2 text-white bg-[#C75D2C] font-semibold opacity-100 rounded-md"
              btnText="Rezerviši"
              onClick={reservationHandler}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AvailabilityCard;
