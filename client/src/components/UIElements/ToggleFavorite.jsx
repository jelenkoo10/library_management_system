import React from "react";
import { useState, useEffect } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import EmptyStar from "../../assets/icons8-star-30.png";
import FilledStar from "../../assets/icons8-star-filled-30.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToggleFavorite = (props) => {
  const { userId, bookId, likedBy } = props;
  const [user, setUser] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUser = async () => {
      const responseData = await sendRequest(
        `http://localhost:5000/api/users/id/${userId}`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      setUser(responseData.user);
      if (responseData.user.favorites.some((x) => x == bookId)) {
        setIsFavorite(true);
      }
    };
    fetchUser();
  }, []);

  const toggleStar = async () => {
    let responseData = null;
    if (isFavorite) {
      responseData = await sendRequest(
        `http://localhost:5000/api/books/removefavorite/${bookId}`,
        "PATCH",
        JSON.stringify({ userId: userId }),
        {
          "Content-Type": "application/json",
        }
      );
      toast.success("Uklonili ste knjigu iz omiljenih knjiga.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        bodyClassName: "toast",
      });
    } else {
      responseData = await sendRequest(
        `http://localhost:5000/api/books/setfavorite/${bookId}`,
        "PATCH",
        JSON.stringify({ userId: userId }),
        {
          "Content-Type": "application/json",
        }
      );
      toast.success("Označili ste knjigu kao omiljenu.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        bodyClassName: "toast",
      });
    }
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center">
      <img
        src={isFavorite ? FilledStar : EmptyStar}
        alt="A star icon"
        onClick={toggleStar}
        className="cursor-pointer"
      />
      <span>{likedBy}</span>
    </div>
  );
};

export default ToggleFavorite;
