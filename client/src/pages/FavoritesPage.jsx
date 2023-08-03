import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHttpClient } from "../hooks/http-hook";
import FavouriteBookCard from "../components/books/FavouriteBookCard";
import LoadingSpinner from "../components/UIElements/LoadingSpinner/LoadingSpinner";

const FavoritesPage = () => {
  const [myFavorites, setMyFavorites] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const uid = JSON.parse(localStorage.getItem("userData")).userId;

  useEffect(() => {
    async function getUserFavorites() {
      const responseData = await sendRequest(
        `http://localhost:5000/api/users/favorites/${uid}`,
        "GET",
        null,
        { "Content-Type": "application/json" }
      );
      setMyFavorites(responseData.favorites);
    }

    getUserFavorites();
  }, []);

  return (
    <section className="bg-[#DDD] bg-opacity-90 border-[#C75D2C] border p-12 grid grid-cols-4 gap-4 items-center place-items-center w-[900px] sm:w-full sm:flex sm:flex-col md:grid md:grid-cols-2 md:gap-4 md:mx-auto lg:grid-cols-3 lg:gap-2">
      {isLoading && <LoadingSpinner asOverlay />}
      {myFavorites[0] ? (
        myFavorites.map((book) => {
          return (
            <FavouriteBookCard
              book={book}
              cardStyle="bg-[#CCC] w-4/5 text-[#C75D2C] rounded-md pr-8 pl-4 py-4 text-white border border-[#C75D2C] bg-opacity-90 flex justify-between items-center sm:w-max sm:p-4"
            />
          );
        })
      ) : (
        <p className="text-[#C75D2C] text-lg font-bold">
          Trenutno nema omiljenih knjiga. Kada označite knjigu kao omiljenu,
          klikom na zvezdicu koja se nalazi pored njenog imena, ona će biti
          prikazana ovde.
        </p>
      )}
    </section>
  );
};

export default FavoritesPage;
