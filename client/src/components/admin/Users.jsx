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
    <section className="p-5 bg-[#DDD] border border-[#C75D2C] bg-opacity-90 sm:h-fit sm:max-h-fit max-h-[65vh] xl:w-2/3 lg:min-h-[70vh]">
      <div className="grid grid-cols-4 gap-4 place-items-center items-center h-[100%] sm:flex sm:flex-col md:grid md:grid-cols-2 md:gap-4 md:mx-auto md:h-[60vh] lg:grid-cols-3 lg:gap-2">
        {users &&
          users.map((user) => (
            <>
              <UserCard
                cardStyle="bg-[#C75D2C] rounded-md pr-8 pl-2 py-4 text-white w-[250px] min-h-[175px]"
                user={user}
                assignBook={assignBook}
                returnBook={returnBook}
              />
            </>
          ))}
      </div>
    </section>
  );
};

export default Users;
