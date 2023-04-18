const express = require("express");
const { check } = require("express-validator");

const booksController = require("../controllers/books-controllers");

const router = express.Router();

router.get("/:bid", booksController.getBookById);

router.get("/:brid", booksController.getBooksByBranch);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("author").not().isEmpty(),
    check("genre").not().isEmpty(),
    check("description").isLength({ min: 20 }),
  ],
  booksController.createBook
);

router.patch(
  "/:bid",
  [
    check("title").not().isEmpty(),
    check("author").not().isEmpty(),
    check("genre").not().isEmpty(),
    check("description").isLength({ min: 20 }),
  ],
  booksController.updateBook
);

router.patch("/assign/:bid", booksController.assignBook);

router.patch("/reserve/:bid", booksController.reserveBook);

router.delete("/:bid", booksController.deleteBook);

module.exports = router;
