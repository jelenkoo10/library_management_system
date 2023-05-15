import React, { useState, useEffect } from "react";
import { useHttpClient } from "../../hooks/http-hook";

const AuthorCard = (props) => {
  const { authorId } = props;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [author, setAuthor] = useState({});

  useEffect(() => {
    async function getAuthor() {
      const responseData = await sendRequest(
        `http://localhost:5000/api/authors/${authorId}`,
        "GET",
        null,
        { "Content-Type": "application/json" }
      );
      setAuthor(responseData.author);
    }

    getAuthor();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">
        {author.name} {author.surname}
      </h1>
      <p>
        <span className="font-semibold">Datum rođenja</span>:{" "}
        {author.date_of_birth} ({author.age} godina)
      </p>
      <p>
        <span className="font-semibold">Nacionalnost</span>:{" "}
        {author.nationality}
      </p>
      <p>
        <span className="font-semibold">Biografija</span>: {author.biography}
      </p>
    </div>
  );
};

export default AuthorCard;
