import { useEffect, useState } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import UserCard from "./UserCard";

const Users = (props) => {
  const [users, setUsers] = useState([]);
  const { error, sendRequest } = useHttpClient();

  useEffect(() => {
    async function fetchUsers() {
      const responseData = await sendRequest(
        "http://localhost:5000/api/users",
        "GET",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      setUsers(responseData.users);
    }
    fetchUsers();
  }, []);
  return (
    <section className="p-5 bg-[#DDD] border border-[#C75D2C] bg-opacity-90 max-h-[65vh] ">
      <div className="grid grid-cols-4 gap-6 items-center h-[100%] overflow-y-scroll overflow-x-hidden">
        {users &&
          users.map((user) => (
            <UserCard
              cardStyle="bg-[#C75D2C] rounded-md pr-8 pl-2 py-4 text-white w-[250px] h-[175px]"
              book={user}
            />
          ))}
      </div>
    </section>
  );
};

export default Users;
