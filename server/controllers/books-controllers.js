const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Book = require("../models/book");
const User = require("../models/user");
const Author = require("../models/author");
const Branch = require("../models/branch");

const getBooksByBranch = async (req, res, next) => {
  const branchId = req.params.brid;

  let books;
  try {
    books = await Book.find({ branch: branchId });
  } catch (err) {
    return next(
      new HttpError("Fetching books failed, please try again later.", 500)
    );
  }

  if (!books) {
    return next(new HttpError("There are no books in this branch.", 500));
  }

  res.json({
    books: books.map((book) => book.toObject({ getters: true })),
  });
};

const getBooksByUser = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError("Fetching user failed, please try again later.", 500)
    );
  }

  let books = [];
  for (let i = 0; i < user.books.length; i++) {
    let book;
    try {
      book = await Book.findById(user.books[i]);
    } catch (err) {
      return next(
        new HttpError("Fetching books failed, please try again later.", 500)
      );
    }
    books.push(book);
  }

  let authors = [];
  for (let i = 0; i < books.length; i++) {
    let author;
    try {
      author = await Author.findById(books[i].author);
    } catch (err) {
      return next(
        new HttpError("Fetching authors failed, please try again later.", 500)
      );
    }
    authors.push({ name: author.name, surname: author.surname });
  }

  let branches = [];
  for (let i = 0; i < books.length; i++) {
    let branch;
    try {
      branch = await Branch.findById(books[i].branch);
    } catch (err) {
      return next(
        new HttpError("Fetching branchs failed, please try again later.", 500)
      );
    }
    branches.push({ name: branch.name, city: branch.city });
  }

  for (let i = 0; i < books.length; i++) {
    books[i] = {
      author: books[i].author,
      branch: books[i].branch,
      description: books[i].description,
      genre: books[i].genre,
      loan_expiry: books[i].loan_expiry,
      status: books[i].status,
      title: books[i].title,
      user: books[i].user,
      year_published: books[i].year_published,
      id: books[i].id,
      authorName: authors[i].name + " " + authors[i].surname,
      branchName: branches[i].name + ", " + branches[i].city,
    };
  }

  res.json({ books });
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
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          authors.includes(`${book.author}`)
      );
    } catch (err) {
      return next(
        new HttpError("Fetching authors failed, please try again later.", 500)
      );
    }
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

  const { title, genre, description, year_published } = req.body;
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
  book.year_published = year_published;
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

  let foundUser;
  try {
    foundUser = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, couldn't assign book."),
      500
    );
  }

  if (foundUser.books.length >= 3) {
    return next(
      new HttpError("Couldn't assign book, user already has 3 books."),
      422
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    book.status = "taken";
    book.loan_expiry = new Date(
      new Date().setMonth(new Date().getMonth() + 1)
    ).toISOString();
    foundUser.reservations.push({
      reservationDate: new Date().toISOString(),
      returnDate: new Date(
        new Date().setMonth(new Date().getMonth() + 1)
      ).toISOString(),
      bookId: bookId,
    });
    foundUser.books.push(book);
    await foundUser.save({ session: sess });
    await book.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, couldn't assign book."),
      500
    );
  }

  res.status(200).json({
    book: book.toObject({ getters: true }),
    user: foundUser.toObject({ getters: true }),
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

  let foundUser;
  try {
    foundUser = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, couldn't assign book."),
      500
    );
  }

  if (foundUser.books.length >= 3) {
    return next(
      new HttpError("Couldn't assign book, user already has 3 books."),
      422
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    book.status = "reserved";
    book.loan_expiry = new Date(
      new Date().setMonth(new Date().getMonth() + 1)
    ).toISOString();
    foundUser.reservations.push({
      reservationDate: new Date().toISOString(),
      returnDate: new Date(
        new Date().setMonth(new Date().getMonth() + 1)
      ).toISOString(),
      bookId: bookId,
    });
    foundUser.books.push(book);
    await foundUser.save({ session: sess });
    await book.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, couldn't assign book."),
      500
    );
  }

  res.status(200).json({
    book: book.toObject({ getters: true }),
    user: foundUser.toObject({ getters: true }),
  });
};

const returnBook = async (req, res, next) => {
  const foundBookId = req.params.bid;
  const { userId } = req.body;

  let book;
  try {
    book = await Book.findById(foundBookId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, couldn't return book."),
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
      new HttpError("Something went wrong, couldn't return book."),
      500
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    book.status = "free";
    book.loan_expiry = null;
    const resIndex = user.reservations
      .map((res) => res.bookId)
      .lastIndexOf(foundBookId);
    user.reservations[resIndex] = Object.assign(
      {},
      user.reservations[resIndex],
      { returnDate: new Date().toISOString() }
    );
    await book.save({ session: sess });
    user.books.pull(book);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, couldn't return book."),
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
exports.getBooksByUser = getBooksByUser;
exports.searchBooks = searchBooks;
exports.updateBook = updateBook;
exports.assignBook = assignBook;
exports.reserveBook = reserveBook;
exports.returnBook = returnBook;
exports.deleteBook = deleteBook;
