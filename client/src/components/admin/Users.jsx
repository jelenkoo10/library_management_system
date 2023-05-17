import { useEffect, useState } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import UserCard from "./UserCard";
import UserAssignModal from "./UserAssignModal";
import UserReturnBook from "./UserReturnBook";

const Users = (props) => {
  const [users, setUsers] = useState([]);
  const { sendRequest } = useHttpClient();
  const [assign, setAssign] = useState(null);
  const [returnBookFromUser, setReturnBookFromUser] = useState(null);

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

  const assignBook = (user) => {
    setAssign(user);
  };

  const returnBook = (user) => {
    setReturnBookFromUser(user);
  };

  const closeModal = () => {
    setAssign(null);
    setReturnBookFromUser(null);
  };

  return (
    <section className="p-5 bg-[#DDD] border border-[#C75D2C] bg-opacity-90 max-h-[65vh] ">
      <div className="grid grid-cols-4 gap-6 items-center h-[100%] overflow-y-scroll overflow-x-hidden">
        {users &&
          users.map((user) => (
            <UserCard
              cardStyle="bg-[#C75D2C] rounded-md pr-8 pl-2 py-4 text-white w-[250px] h-[175px]"
              user={user}
              assignBook={assignBook}
              returnBook={returnBook}
            />
          ))}
        {assign && <UserAssignModal closeModal={closeModal} user={assign} />}
        {returnBookFromUser && (
          <UserReturnBook closeModal={closeModal} user={returnBookFromUser} />
        )}
      </div>
    </section>
  );
};

export default Users;
