const express = require("express");
const { check } = require("express-validator");

const booksController = require("../controllers/books-controllers");

const router = express.Router();

router.get("/id/:bid", booksController.getBookById);

router.get("/branch/:brid", booksController.getBooksByBranch);

router.get("/search", booksController.searchBooks);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("genre").not().isEmpty(),
    check("description").isLength({ min: 20 }),
    check("year_published").not().isEmpty(),
  ],
  booksController.createBook
);

router.patch(
  "/:bid",
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

router.delete("/:bid", booksController.deleteBook);

module.exports = router;
