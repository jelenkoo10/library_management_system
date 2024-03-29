const express = require("express");
const cors = require("cors");
const { check } = require("express-validator");

const booksController = require("../controllers/books-controllers");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.get("/id/:bid", booksController.getBookById);

router.get("/branch/:brid", booksController.getBooksByBranch);

router.get("/:uid/books", booksController.getBooksByUser);

router.get("/availability", booksController.getBookAvailability);

router.get("/barcode/:bc", booksController.getBookIdByBarcode);

router.get("/search", booksController.searchBooks);

router.get("/filters", booksController.getFilters);

router.get("/download/:bid", booksController.downloadBook);

router.get("/downloadtemplate", booksController.downloadTemplate);

router.get("/getcomments/:bid", booksController.getBookComments);

router.post(
  "/",
  fileUpload.fields([
    {
      name: "pdf",
      maxCount: 1,
    },
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  [
    check("title").not().isEmpty(),
    check("genre").not().isEmpty(),
    check("description").isLength({ min: 20 }),
    check("year_published").not().isEmpty(),
  ],
  booksController.createBook
);

router.post(
  "/import",
  fileUpload.single("excelFile"),
  booksController.importBooksFromExcel
);

router.post("/openurl", booksController.openBookURL);

router.patch(
  "/:bid",
  fileUpload.fields([
    {
      name: "pdf",
      maxCount: 1,
    },
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  [
    check("title").not().isEmpty(),
    check("genre").not().isEmpty(),
    check("description").isLength({ min: 20 }),
    check("year_published").not().isEmpty(),
  ],
  booksController.updateBook
);

router.patch("/assign/:bid", booksController.assignBook);

router.patch("/reserve/:bid", booksController.reserveBook);

router.patch("/return/:bid", booksController.returnBook);

router.patch(
  "/comment/:bid",
  [check("commentText").isLength({ min: 10 })],
  booksController.addBookComment
);

router.patch("/setfavorite/:bid", booksController.setBookAsFavourite);

router.patch("/removefavorite/:bid", booksController.removeBookFromFavourites);

router.patch("/setwishlist/:bid", booksController.addBookToWishlist);

router.patch("/removewishlist/:bid", booksController.removeBookFromWishlist);

router.delete("/:bid", booksController.deleteBook);

module.exports = router;
