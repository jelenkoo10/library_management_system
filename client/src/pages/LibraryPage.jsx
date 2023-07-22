import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import BranchCard from "../components/profile/BranchCard";
import { useHttpClient } from "../hooks/http-hook";
import { ModalContext } from "../context/modal-context";
import AddBranch from "../components/profile/AddBranch";
import LoadingSpinner from "../components/UIElements/LoadingSpinner/LoadingSpinner";

const LibraryPage = () => {
  let { handleModal } = React.useContext(ModalContext);
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

  return (
    <section className="flex bg-[#DDD] bg-opacity-90 border-[#C75D2C] border p-12 flex-col w-[900px] sm:w-full sm:p-4 md:p-10 xl:w-[800px] xl:p-8">
      {isLoading && <LoadingSpinner asOverlay />}
      <h1 className="font-bold text-xl text-center text-[#C75D2C] mb-6">
        Ogranci u kojima ste učlanjeni
      </h1>
      <div className="overflow-y-scroll h-[200px] grid grid-cols-2 gap-2 items-center sm:flex sm:flex-col">
        {myBranches &&
          myBranches.map((branch) => (
            <BranchCard branch={branch} key={branch.id} />
          ))}
      </div>
      <div
        className="mx-auto mt-10 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md max-w-fit hover:bg-[#D76D3C] cursor-pointer"
        onClick={() =>
          handleModal(
            "Novi ogranak",
            <AddBranch withoutBranches={myBranches} />
          )
        }
      >
        Učlanite se u novi ogranak
      </div>
    </section>
  );
};

export default LibraryPage;
