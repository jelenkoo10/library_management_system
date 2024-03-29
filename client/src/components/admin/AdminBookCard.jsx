import React, { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import Button from "../UIElements/Button";
import { ModalContext } from "../../context/modal-context";
import AdminBookUpdateModal from "./AdminBookUpdateModal";

const AdminBookCard = (props) => {
  let { handleModal } = React.useContext(ModalContext);
  const { book, cardStyle, deleteBook, updateBook, confirmBookReservation } =
    props;
  const auth = useContext(AuthContext);
  const userData = auth.isLoggedIn
    ? JSON.parse(localStorage.getItem("userData")).is_admin
    : null;

  const handleConfirm = async () => {
    confirmBookReservation(book.id);
  };

  const handleDelete = async () => {
    deleteBook(book.id);
  };

  const handleUpdate = async () => {
    updateBook(book);
  };

  return (
    <>
      {book && (
        <div className={cardStyle}>
          <h1 className="text-xl font-bold">{book.title}</h1>
          <p className="text-md font-semibold">{book.authorName}</p>
          {book.loan_expiry && (
            <>
              <p className="text-sm">
                Rok isteka pozajmice: {book.loan_expiry.slice(0, 10)}
              </p>
              {book.status == "rezervisano" && (
                <Button
                  btnStyle="text-white font-bold opacity-100 underline"
                  btnText="Potvrdi rezervaciju"
                  onClick={handleConfirm}
                />
              )}
            </>
          )}
          {book.branchName && (
            <p className="text-sm">Ogranak: {book.branchName}</p>
          )}
          {userData && (
            <div>
              <Button
                btnStyle="p-2 mx-2 bg-white text-[#C75D2C] font-semibold opacity-100 rounded-md"
                btnText="Izmeni"
                onClick={() =>
                  handleModal(
                    "Izmena podataka o knjizi",
                    <AdminBookUpdateModal book={book} />
                  )
                }
              />
              <Button
                btnStyle="p-2 mx-2 mt-3 bg-[#C75D2C] text-white font-semibold opacity-100 rounded-md"
                btnText="Obriši"
                onClick={handleDelete}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AdminBookCard;
