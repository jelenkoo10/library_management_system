import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth-context";
import Button from "../UIElements/Button";

const UserCard = (props) => {
  const { user, cardStyle, deleteBook, updateBook } = props;
  const auth = useContext(AuthContext);
  const userData = auth.isLoggedIn
    ? JSON.parse(localStorage.getItem("userData")).is_admin
    : null;

  const handleDelete = async () => {
    deleteBook(user.id);
  };

  const handleUpdate = async () => {
    updateBook(user);
  };

  return (
    <div className={cardStyle}>
      <h1 className="text-xl font-bold">{user.name + "" + user.surname}</h1>
      <p className="text-md font-semibold">{user.email}</p>
      <p className="text-sm">Rok isteka pozajmice: {user.phone}</p>

      {/* {book.branchName && (
            <p className="text-sm">Ogranak: {book.branchName}</p>
          )} */}
      <div>
        <Button
          btnStyle="p-2 mx-2 bg-white text-[#C75D2C] font-semibold opacity-100 rounded-md"
          btnText="Izmeni"
          onClick={handleUpdate}
        />
        <Button
          btnStyle="p-2 mx-2 mt-3 bg-[#C75D2C] text-white font-semibold opacity-100 rounded-md"
          btnText="Obriši"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default UserCard;
