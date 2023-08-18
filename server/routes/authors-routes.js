const express = require("express");
const { check } = require("express-validator");

const fileUpload = require("../middleware/file-upload");
const authorsController = require("../controllers/authors-controllers");

const router = express.Router();

router.get("/", authorsController.getAuthors);

router.get("/:aid", authorsController.getAuthorById);

router.post(
  "/",
  fileUpload.single("image"),
  [
    check("name").not().isEmpty(),
    check("surname").not().isEmpty(),
    check("biography").isLength({ min: 50 }),
    check("date_of_birth").not().isEmpty(),
    check("nationality").not().isEmpty(),
    check("age").isNumeric(),
  ],
  authorsController.addAuthor
);

router.patch(
  "/:aid",
  [
    check("name").not().isEmpty(),
    check("surname").not().isEmpty(),
    check("biography").isLength({ min: 50 }),
    check("date_of_birth").not().isEmpty(),
    check("nationality").not().isEmpty(),
    check("age").isNumeric(),
  ],
  authorsController.updateAuthor
);

router.delete("/:aid", authorsController.deleteAuthor);

module.exports = router;
