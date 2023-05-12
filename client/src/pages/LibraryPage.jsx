import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import BranchCard from "../components/profile/BranchCard";
import { useHttpClient } from "../hooks/http-hook";

const LibraryPage = () => {
  const [myBranches, setMyBranches] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const uid = JSON.parse(localStorage.getItem("userData")).userId;

  useEffect(() => {
    async function getBranches() {
      const responseData = await sendRequest(
        `http://localhost:5000/api/users/branches/${uid}`,
        "GET",
        null,
        { "Content-Type": "application/json" }
      );
      setMyBranches(responseData.branches);
    }

    getBranches();
  }, []);

  console.log(myBranches);

  return (
    <section className="flex bg-[#DDD] opacity-90 border-[#C75D2C] border p-12 flex flex-col">
      <h1 className="font-bold text-xl text-center text-[#C75D2C] mb-10">
        Ogranci u kojima ste učlanjeni
      </h1>
      {myBranches &&
        myBranches.map((branch) => (
          <BranchCard branch={branch} key={branch.id} />
        ))}
      <div className="mx-auto mt-10 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md max-w-fit hover:bg-[#D76D3C] cursor-pointer">
        Učlanite se u novi ogranak
      </div>
    </section>
  );
};

export default LibraryPage;
