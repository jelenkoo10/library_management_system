import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHttpClient } from "../hooks/http-hook";
import BookCard from "../components/books/BookCard";
import LoadingSpinner from "../components/UIElements/LoadingSpinner/LoadingSpinner";

const RecommendationsPage = () => {
  const [myRecommendations, setMyRecommendations] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const uid = JSON.parse(localStorage.getItem("userData")).userId;

  useEffect(() => {
    async function getUserRecommendations() {
      const responseData = await sendRequest(
        `http://localhost:5000/api/users/recommendations/${uid}`,
        "GET",
        null,
        { "Content-Type": "application/json" }
      );
      setMyRecommendations(responseData.books);
    }

    getUserRecommendations();
  }, []);

  return (
    <section className="bg-[#DDD] bg-opacity-90 border-[#C75D2C] border p-12 grid grid-cols-2 gap-6 items-center w-[900px] h-[562px] overflow-y-scroll sm:p-4 sm:flex sm:flex-col sm:w-full">
      {isLoading && <LoadingSpinner asOverlay />}
      {myRecommendations[0] ? (
        myRecommendations.map((book) => {
          return (
            <BookCard
              book={book}
              cardStyle="bg-[#CCC] w-4/5 text-[#C75D2C] rounded-md pr-8 pl-4 py-4 text-white border border-[#C75D2C] bg-opacity-90 sm:w-full sm:px-4 sm:py-2"
            />
          );
        })
      ) : (
        <p className="text-[#C75D2C] text-lg font-bold">
          Trenutno nema preporučenih knjiga. Kada označite neku knjigu kao
          omiljenu, preporučene knjige koje su istog žanra će biti prikazane
          ovde.
        </p>
      )}
    </section>
  );
};

export default RecommendationsPage;
