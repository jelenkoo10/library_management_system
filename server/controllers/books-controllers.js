const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Book = require("../models/book");
const User = require("../models/user");
const Author = require("../models/author");

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
  const { title, genre, description, year_published, authorId, branchId } =
    req.body;

  const newBook = new Book({
    title,
    genre,
    description,
    year_published,
    loan_expiry: null,
    status: "free",
    author: authorId,
    branch: branchId,
    user: null,
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

  if (!book) {
    return next(
      new HttpError("Couldn't find a book for the provided ID.", 404)
    );
  }

  res.json({
    book: book.toObject({ getters: true }),
  });
};

const searchBooks = async (req, res, next) => {
  const { searchQuery } = req.body;

  let books;
  try {
    books = await Book.find({});
  } catch (err) {
    return next(
      new HttpError("Fetching books failed, please try again later.", 500)
    );
  }
  let authors;
  if (!books) {
    return next(new HttpError("There are no books found, sorry.", 404));
  } else {
    try {
      authors = await Author.find({});
    } catch (err) {
      return next(
        new HttpError("Fetching authors failed, please try again later.", 500)
      );
    }
    authors = authors
      .filter(
        (author) =>
          author.name.toLowerCase().includes(searchQuery) ||
          author.surname.toLowerCase().includes(searchQuery) ||
          author.name.toUpperCase().includes(searchQuery) ||
          author.surname.toUpperCase().includes(searchQuery)
      )
      .map((foundAuthor) => foundAuthor.id);
    books = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery) ||
        book.title.toUpperCase().includes(searchQuery) ||
        authors.includes(book.author)
    );
  }

  if (!books) {
    return next(new HttpError("There are no books found, sorry.", 404));
  }

  res.json({
    books: books.map((book) => book.toObject({ getters: true })),
    authors: authors,
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
    book = await Book.findById(bookId);
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

const assignBook = async (req, res, next) => {
  const bookId = req.params.bid;
  const { userId } = req.body;

  let book;
  try {
    book = await Book.findById(bookId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, couldn't assign book."),
      500
    );
  }

  if (!book) {
    return next(
      new HttpError("Couldn't find a book for the provided ID."),
      404
    );
  }

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, couldn't assign book."),
      500
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    book.status = "taken";
    book.user = user;
    await book.save({ session: sess });
    user.books.push(book);
    user.reservations.push({
      reservationDate: new Date().toISOString(),
      returnDate: null,
      bookId: bookId,
    });
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, couldn't assign book."),
      500
    );
  }

  res.status(200).json({
    book: book.toObject({ getters: true }),
    user: user.toObject({ getters: true }),
  });
};

const reserveBook = async (req, res, next) => {
  const bookId = req.params.bid;
  const { userId } = req.body;

  let book;
  try {
    book = await Book.findById(bookId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, couldn't assign book."),
      500
    );
  }

  if (!book) {
    return next(
      new HttpError("Couldn't find a book for the provided ID."),
      404
    );
  }

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, couldn't assign book."),
      500
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    book.status = "reserved";
    book.user = user;
    await book.save({ session: sess });
    user.books.push(book);
    user.reservations.push({
      reservationDate: new Date().toISOString(),
      returnDate: null,
      bookId: bookId,
    });
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, couldn't assign book."),
      500
    );
  }

  res.status(200).json({
    book: book.toObject({ getters: true }),
    user: user.toObject({ getters: true }),
  });
};

const returnBook = async (req, res, next) => {
  const bookId = req.params.bid;
  const { userId } = req.body;

  let book;
  try {
    book = await Book.findById(bookId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, couldn't assign book."),
      500
    );
  }

  if (!book) {
    return next(
      new HttpError("Couldn't find a book for the provided ID."),
      404
    );
  }

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, couldn't assign book."),
      500
    );
  }

  const previousReservations = (id) => id === bookId;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    book.status = "free";
    book.user = null;
    await book.save({ session: sess });
    user.books.pull(book);
    let bookIndex = user.reservations.findLastIndex(previousReservations);
    user.reservations[bookIndex] = {
      ...user.reservations[bookIndex],
      returnDate: new Date().toISOString(),
    };
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, couldn't assign book."),
      500
    );
  }

  res.status(200).json({
    book: book.toObject({ getters: true }),
    user: user.toObject({ getters: true }),
  });
};

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
exports.searchBooks = searchBooks;
exports.updateBook = updateBook;
exports.assignBook = assignBook;
exports.reserveBook = reserveBook;
exports.returnBook = returnBook;
exports.deleteBook = deleteBook;
