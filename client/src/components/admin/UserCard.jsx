import { useEffect, useState } from "react";
import Button from "../UIElements/Button";
import { useHttpClient } from "../../hooks/http-hook";

const UserCard = (props) => {
  const { user, cardStyle, assignBook, returnBook } = props;
  const [branches, setBranches] = useState([]);
  const { sendRequest } = useHttpClient();

  const handleReturn = async () => {
    returnBook(user);
  };

  const handleAssign = async () => {
    assignBook(user);
  };

  useEffect(() => {
    async function fetchBranches() {
      const responseData = await sendRequest(
        `http://localhost:5000/api/users/branches/${user.id}`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      setBranches(responseData.branches);
    }
    fetchBranches();
  }, []);

  return (
    <div className={cardStyle}>
      <h1 className="text-xl font-bold">{user.name + "" + user.surname}</h1>
      <p className="text-md font-semibold">{user.email}</p>
      <p className="text-sm">Telefon: {user.phone}</p>

      {branches && (
        <p className="text-sm">
          Ogranci:
          {branches.map((branch) => {
            const coma = branches.lenght > 1 ? ", " : "";
            return branch.name + coma;
          })}
        </p>
      )}
      <div>
        <Button
          btnStyle="p-2 mx-2 bg-white text-[#C75D2C] font-semibold opacity-100 rounded-md"
          btnText="Upisi"
          onClick={handleAssign}
        />
        <Button
          btnStyle="p-2 mx-2 mt-3 bg-[#C75D2C] text-white font-semibold opacity-100 rounded-md"
          btnText="Vrati"
          onClick={handleReturn}
        />
      </div>
    </div>
  );
};

export default UserCard;
