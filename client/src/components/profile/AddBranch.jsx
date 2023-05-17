import React, { useState, useEffect } from "react";
import Select from "../UIElements/Select";
import Button from "../UIElements/Button";
import { useHttpClient } from "../../hooks/http-hook";

const AddBranch = (props) => {
  const { withoutBranches } = props;
  const [myBranches, setMyBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const uid = JSON.parse(localStorage.getItem("userData")).userId;

  useEffect(() => {
    async function getBranches() {
      const responseData = await sendRequest(
        `http://localhost:5000/api/branches`,
        "GET",
        null,
        { "Content-Type": "application/json" }
      );

      setMyBranches(
        responseData.branches.filter((branch) => {
          let isMyBranch = true;
          for (let i = 0; i < withoutBranches.length; i++) {
            if (withoutBranches[i]._id === branch.id) {
              isMyBranch = false;
            }
            return isMyBranch;
          }
        })
      );
    }

    getBranches();
  }, []);

  const addBranchHandler = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/users/${uid}/branch_update`,
        "PATCH",
        JSON.stringify({
          branchId: myBranches[0].id,
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {}
  };

  const selectHandler = (e) => {
    setSelectedBranch(e.target.value);
  };

  return (
    <form className="mx-auto" onSubmit={addBranchHandler}>
      <Select
        selectStyle="my-4 mx-5 block border-b-2 border-[#B8572A] w-[200px]"
        selectId="branches"
        selectName="branches"
        labelName="Ogranci"
        labelStyle="text-xl text-[#C75D2C]"
        options={myBranches}
        onChange={selectHandler}
      />
      <Button
        btnStyle="mt-10 block bg-[#C75D2C] px-6 py-2 text-white text-lg font-bold rounded-md"
        btnText="Učlani se"
        type="submit"
      />
    </form>
  );
};

export default AddBranch;
