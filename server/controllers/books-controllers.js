const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Book = require("../models/book");

const getBooksByBranch = async (req, res, next) => {
  const branchId = req.params.brid;

  let books;
  try {
    books = await Book.find({});
  } catch (err) {
    return next(
      new HttpError("Fetching books failed, please try again later.", 500)
    );
  }

  if (!books) {
    return next(new HttpError("There are no books in this branch.", 500));
  }

  res.json({
    books: books
      .filter((book) => book.branch === branchId)
      .map((book) => book.toObject({ getters: true })),
  });
};

const createBook = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { title, author, genre, description, year_published } = req.body;

  const newBook = new Book({
    title,
    author,
    genre,
    description,
    year_published,
    loan_expiry: null,
    status: free,
  });

  try {
    await newBook.save();
  } catch (err) {
    return next("Creating a book failed, please try again.", 500);
  }

  res.status(201).json({ book: newBook.toObject({ getters: true }) });
};

const getBookById = async (req, res, next) => {
  const bookId = req.params.bid;

  let book;
  try {
    book = await Book.findById(bookId);
  } catch (err) {
    return next(
      new HttpError("Couldn't find a book for the provided ID.", 404)
    );
  }

  res.json({
    book: book.toObject({ getters: true }),
  });
};

const updateBook = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, author, genre, description } = req.body;
  const bookId = req.params.bid;

  let book;
  try {
    book = await book.findById(bookId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, couldn't update book."),
      500
    );
  }

  book.title = title;
  book.author = author;
  book.genre = genre;
  book.description = description;

  try {
    await book.save();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, couldn't update book."),
      500
    );
  }

  res.status(200).json({ book: book.toObject({ getters: true }) });
};

const assignBook = async (req, res, next) => {};

const reserveBook = async (req, res, next) => {};

const returnBook = async (req, res, next) => {};

const deleteBook = async (req, res, next) => {
  const bookId = req.params.bid;

  let book;
  try {
    book = await Book.findById(bookId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, couldn't delete book."),
      500
    );
  }

  if (!book) {
    return next(
      new HttpError("Couldn't find a book for the provided ID."),
      404
    );
  }

  try {
    await book.remove();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, couldn't delete book."),
      500
    );
  }

  res.status(200).json({ message: "Deleted book." });
};

exports.getBooksByBranch = getBooksByBranch;
exports.createBook = createBook;
exports.getBookById = getBookById;
exports.updateBook = updateBook;
exports.assignBook = assignBook;
exports.reserveBook = reserveBook;
exports.returnBook = returnBook;
exports.deleteBook = deleteBook;
