import React from "react";
import { useState, useEffect } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import EmptyStar from "../../assets/icons8-star-30.png";
import FilledStar from "../../assets/icons8-star-filled-30.png";

const ToggleFavorite = (props) => {
  const { userId, bookId } = props;
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
    } else {
      responseData = await sendRequest(
        `http://localhost:5000/api/books/setfavorite/${bookId}`,
        "PATCH",
        JSON.stringify({ userId: userId }),
        {
          "Content-Type": "application/json",
        }
      );
    }
    setIsFavorite((prev) => !prev);
  };

  return (
    <img
      src={isFavorite ? FilledStar : EmptyStar}
      alt="A star icon"
      onClick={toggleStar}
      className="cursor-pointer"
    />
  );
};

export default ToggleFavorite;
