import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import BranchCard from "../components/profile/BranchCard";

const LibraryPage = () => {
  const [myBranches, setMyBranches] = useState([]);

  useEffect(() => {
    async function getBranches() {
      const response = await fetch(
        "http://localhost:5000/api/users/branches/644506351bd88b2d9ccd80c0"
      );
      const data = await response.json();
      setMyBranches(data.branches);
    }

    getBranches();
  }, []);

  console.log(myBranches);

  return (
    <section className="flex bg-white opacity-80 border-[#C75D2C] border p-12 flex flex-col">
      <h1 className="font-bold text-xl text-center text-[#C75D2C] mb-10">
        Ogranci u kojima ste učlanjeni
      </h1>
      {myBranches && myBranches.map((branch) => <BranchCard branch={branch} />)}
      <div className="mx-auto mt-10 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md max-w-fit hover:bg-[#D76D3C] cursor-pointer">
        Učlanite se u novi ogranak
      </div>
    </section>
  );
};

export default LibraryPage;
