import close from "../../assets/close.png";
import AdminAddBookForm from "./AdminAddBookForm";
import AdminAddAuthorForm from "./AdminAddAuthorForm";
import AdminImportExcelForm from "./AdminImportExcelForm";

const AdminAddModal = (props) => {
  const { closeModal, modal } = props;

  return (
    <div className="z-5000 absolute w-[58vw] h-[60%] top-[20%] left-[21vw]">
      <div
        className="w-[20px] h-[20px] absolute top-[50px] right-[40px] cursor-pointer"
        onClick={closeModal}
      >
        <img src={close} alt="close" className="w-full h-full" />
      </div>
      {modal === "book" && <AdminAddBookForm closeModal={closeModal} />}
      {modal === "author" && <AdminAddAuthorForm closeModal={closeModal} />}
      {modal === "excel" && <AdminImportExcelForm closeModal={closeModal} />}
    </div>
  );
};

export default AdminAddModal;
