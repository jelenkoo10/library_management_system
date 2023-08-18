import React, { useEffect } from "react";
import { useState } from "react";
import { useHttpClient } from "../../hooks/http-hook";

const CommentCard = ({ comment }) => {
  const [user, setUser] = useState();
  const { sendRequest } = useHttpClient();

  console.log(comment);

  useEffect(() => {
    const getUser = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/id/${comment.userId}`,
          "GET",
          null,
          {
            "Content-Type": "application/json",
          }
        );
        setUser(responseData.user);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, []);

  return (
    <div className="w-[600px] bg-[#DDD] mx-auto my-4 text-[#C75D2C] p-4 border-2 border-[#C75D2C] rounded-md justify-between text-left sm:w-11/12 md:w-3/5 lg:w-[300px] lg:my-2 xl:w-[500px] xl:my-4 h-fit">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={user && user.image}
            alt="Profilna slika korisnika"
            className="w-[30px] h-[30px] rounded-2xl mr-2"
          />
          <p className="font-semibold">{comment.userName}</p>
        </div>
        <p>{comment.commentDate.slice(0, 10)}</p>
      </div>
      <p className="mt-3">{comment.commentText}</p>
    </div>
  );
};

export default CommentCard;
