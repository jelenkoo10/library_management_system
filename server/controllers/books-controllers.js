const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const download = require("download");
const fs = require("fs");
const xlsx = require("xlsx");

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
      new HttpError(
        "Nalaženje knjiga nije uspelo, pokušajte ponovo kasnije.",
        500
      )
    );
  }

  if (!books) {
    return next(new HttpError("Nema knjiga u ovom ogranku.", 500));
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
      new HttpError(
        "Nalaženje korisnika nije uspelo, pokušajte ponovo kasnije.",
        500
      )
    );
  }

  let books = [];
  for (let i = 0; i < user.books.length; i++) {
    let book;
    try {
      book = await Book.findById(user.books[i]);
    } catch (err) {
      return next(
        new HttpError(
          "Nalaženje knjiga nije uspelo, pokušajte ponovo kasnije.",
          500
        )
      );
    }
    books.push(book);
  }

  res.json({ books });
};

const getBookAvailability = async (req, res, next) => {
  const bookName = req.query.book;
  const authorName = req.query.author;

  let books;
  try {
    books = await Book.find({});
  } catch (err) {
    return next(
      new HttpError(
        "Nalaženje knjiga nije uspelo, pokušajte ponovo kasnije.",
        500
      )
    );
  }

  if (!books) {
    return next(new HttpError("Nema pronađenih knjiga, žao nam je.", 404));
  } else {
    books = books.filter(
      (book) =>
        book.title.toLowerCase().includes(bookName.toLowerCase()) &&
        book.authorName.toLowerCase().includes(authorName.toLowerCase())
    );
  }

  if (!books) {
    return next(new HttpError("Nema pronađenih knjiga, žao nam je.", 404));
  }

  res.json({
    books: books.map((book) => book.toObject({ getters: true })),
  });
};

const createBook = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Pogrešni unosi, proverite vaše podatke.", 422));
  }
  const {
    title,
    genre,
    description,
    language,
    year_published,
    authorId,
    branchId,
  } = req.body;

  let author;
  let branch;

  try {
    author = await Author.findById(authorId);
  } catch (err) {
    return next(new HttpError("Nešto nije u redu, pokušajte ponovo.", 500));
  }

  try {
    branch = await Branch.findById(branchId);
  } catch (err) {
    return next(new HttpError("Nešto nije u redu, pokušajte ponovo.", 500));
  }

  const newBook = new Book({
    title,
    genre,
    description,
    language,
    year_published,
    loan_expiry: null,
    status: "slobodno",
    pdf: req.file ? "http://localhost:5000/" + req.file.path : null,
    author: authorId,
    authorName: author.name + " " + author.surname,
    branch: branchId,
    branchName: branch.name + ", " + branch.city,
    user: null,
  });

  try {
    await newBook.save();
  } catch (err) {
    return next("Kreiranje knjige nije uspelo, pokušajte ponovo.", 500);
  }

  res.status(201).json({ book: newBook.toObject({ getters: true }) });
};

const importBooksFromExcel = async (req, res, next) => {
  const workbook = xlsx.readFile(req.file.path);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const data = xlsx.utils.sheet_to_json(worksheet);

  for (const bookData of data) {
    const {
      title,
      genre,
      description,
      language,
      year_published,
      loan_expiry,
      status,
      author,
      authorName,
      branch,
      branchName,
    } = bookData;

    const existingBook = await Book.findOne({
      title,
      genre,
      description,
      language,
      branch,
    });

    if (existingBook) {
      return new HttpError(`Knjiga sa naslovom "${title}" već postoji u bazi.`);
    } else {
      const book = new Book({
        title,
        genre,
        description,
        language,
        year_published,
        loan_expiry,
        status,
        author,
        authorName,
        branch,
        branchName,
      });

      try {
        await book.save();
        console.log(`Knjiga "${title}" je uspešno ubačena u bazu.`);
      } catch (err) {
        console.error(
          `Greška pri ubacivanju knjige "${title}" u bazu:`,
          err.message
        );
      }
    }
  }

  res.status(201).json({ message: "Knjige su uspešno ubačene u bazu." });
};

const getBookById = async (req, res, next) => {
  const bookId = req.params.bid;

  let book;
  try {
    book = await Book.findById(bookId);
  } catch (err) {
    return next(
      new HttpError("Nije moguće pronaći knjigu sa pruženim ID.", 404)
    );
  }

  if (!book) {
    return next(
      new HttpError("Nije moguće pronaći knjigu sa pruženim ID.", 404)
    );
  }

  res.json({
    book: book.toObject({ getters: true }),
  });
};

const searchBooks = async (req, res, next) => {
  const searchQuery = req.query.searchquery;
  const genre = req.query.genre || "";
  const language = req.query.language;
  const status = req.query.status || "";
  const year = req.query.year || "";

  let books;
  try {
    books = await Book.find({});
  } catch (err) {
    return next(
      new HttpError(
        "Nalaženje knjiga nije uspelo, pokušajte ponovo kasnije.",
        500
      )
    );
  }

  if (!books) {
    return next(new HttpError("Nema pronađenih knjiga, žao nam je.", 404));
  } else {
    books = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.authorName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    books = books.filter(
      (book) =>
        book.genre.toLowerCase().includes(genre.toLowerCase()) &&
        book.status.toLowerCase().includes(status.toLowerCase()) &&
        book.year_published.toLowerCase().includes(year.toLowerCase()) &&
        book.language.toLowerCase().includes(language.toLowerCase())
    );
  }

  if (!books) {
    return next(new HttpError("Nema pronađenih knjiga, žao nam je.", 404));
  }

  res.json({
    books: books.map((book) => book.toObject({ getters: true })),
  });
};

const updateBook = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Pogrešni unosi, proverite vaše podatke.", 422));
  }

  const { title, genre, description, language, year_published } = req.body;
  const bookId = req.params.bid;

  let book;
  try {
    book = await Book.findById(bookId);
  } catch (err) {
    return next(
      new HttpError("Nešto nije u redu, ažuriranje knjige nije moguće.", 500)
    );
  }

  book.title = title;
  book.year_published = year_published;
  book.genre = genre;
  book.description = description;
  book.language = language;
  book.pdf = req.file ? "http://localhost:5000/" + req.file.path : book.pdf;

  try {
    await book.save();
  } catch (err) {
    return next(
      new HttpError("Nešto nije u redu, ažuriranje knjige nije moguće.", 500)
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
      new HttpError("Nešto nije u redu, dodeljivanje knjige nije moguće.", 500)
    );
  }

  if (!book) {
    return next(
      new HttpError("Nije moguće pronaći knjigu za pruženi ID."),
      404
    );
  }

  let foundUser;
  try {
    foundUser = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError("Nešto nije u redu, rezervacija knjige nije moguća.", 500)
    );
  }

  if (foundUser.books.length >= 3) {
    return next(
      new HttpError(
        "Nije moguće rezervisati knjigu, korisnik već ima 3 knjige."
      ),
      422
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    book.status = "zauzeto";
    book.user = userId;
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
      new HttpError("Nešto nije u redu, dodeljivanje knjige nije moguće.", 500)
    );
  }

  res.status(200).json({
    book: book.toObject({ getters: true }),
    user: foundUser.toObject({ getters: true }),
    message: "Potvrđena rezervacija.",
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
      new HttpError("Nešto nije u redu, rezervacija knjige nije moguća.", 500)
    );
  }

  if (!book) {
    return next(
      new HttpError("Nije moguće pronaći knjigu za pruženi ID."),
      404
    );
  }

  let foundUser;
  try {
    foundUser = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError("Nešto nije u redu, rezervacija knjige nije moguća.", 500)
    );
  }

  if (foundUser.books.length >= 3) {
    return next(
      new HttpError(
        "Nije moguće rezervisati knjigu, korisnik već ima 3 knjige."
      ),
      422
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    book.status = "rezervisano";
    book.user = userId;
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
      new HttpError("Nešto nije u redu, rezervacija knjige nije moguća.", 500)
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
      new HttpError("Nešto nije u redu, vraćanje knjige nije moguće.", 500)
    );
  }

  if (!book) {
    return next(
      new HttpError("Nije moguće pronaći knjigu za pruženi ID."),
      404
    );
  }

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError("Nešto nije u redu, vraćanje knjige nije moguće.", 500)
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    book.status = "slobodno";
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
      new HttpError("Nešto nije u redu, vraćanje knjige nije moguće.", 500)
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
      new HttpError("Nešto nije u redu, brisanje knjige nije moguće.", 500)
    );
  }

  if (!book) {
    return next(
      new HttpError("Nije moguće pronaći knjigu za pruženi ID."),
      404
    );
  }

  try {
    await book.remove();
  } catch (err) {
    return next(
      new HttpError("Nešto nije u redu, brisanje knjige nije moguće.", 500)
    );
  }

  res.status(200).json({ message: "Knjiga je obrisana." });
};

const getFilters = async (req, res, next) => {
  let books;
  try {
    books = await Book.find({});
  } catch (err) {
    return next(
      new HttpError(
        "Nalaženje knjiga nije uspelo, pokušajte ponovo kasnije.",
        500
      )
    );
  }

  let languages = [];
  let genres = [];
  for (let i = 0; i < books.length; i++) {
    if (!languages.includes(books[i].language)) {
      languages.push(books[i].language);
    }
    let bookGenres = books[i].genre.split(", ");
    for (let j = 0; j < bookGenres.length; j++) {
      if (!genres.includes(bookGenres[j])) {
        genres.push(bookGenres[j]);
      }
    }
  }

  let languageObjects = [{ id: "", name: "" }];
  let genreObjects = [{ id: "", name: "" }];
  for (let i = 0; i < languages.length; i++) {
    languageObjects.push({ id: languages[i], name: languages[i] });
  }
  for (let i = 0; i < genres.length; i++) {
    genreObjects.push({ id: genres[i], name: genres[i] });
  }

  res.json({ languages: languageObjects, genres: genreObjects });
};

const setBookAsFavourite = async (req, res, next) => {
  const bookId = req.params.bid;
  const { userId } = req.body;

  let book;
  try {
    book = await Book.findById(bookId);
  } catch (err) {
    return next(
      new HttpError("Nešto nije u redu, knjiga nije pronađena.", 500)
    );
  }

  if (!book) {
    return next(
      new HttpError("Nije moguće pronaći knjigu za pruženi ID."),
      404
    );
  }

  let foundUser;
  try {
    foundUser = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError(
        "Nešto nije u redu, dodavanje knjige među omiljene nije moguće.",
        500
      )
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    foundUser.favorites.push(book);
    book.likedBy.push(foundUser);
    await foundUser.save({ session: sess });
    await book.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError(
        "Nešto nije u redu, dodavanje knjige među omiljene nije moguće.",
        500
      )
    );
  }

  res.json({
    book: book.toObject({ getters: true }),
    user: foundUser.toObject({ getters: true }),
  });
};

const removeBookFromFavourites = async (req, res, next) => {
  const foundBookId = req.params.bid;
  const { userId } = req.body;

  let book;
  try {
    book = await Book.findById(foundBookId);
  } catch (err) {
    return next(
      new HttpError(
        "Nešto nije u redu, vraćanje knjige iz omiljenih nije moguće.",
        500
      )
    );
  }

  if (!book) {
    return next(
      new HttpError("Nije moguće pronaći knjigu za pruženi ID."),
      404
    );
  }

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError(
        "Nešto nije u redu, vraćanje knjige iz omiljenih nije moguće.",
        500
      )
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    book.likedBy.pull(user);
    await book.save({ session: sess });
    user.favorites.pull(book);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError(
        "Nešto nije u redu, vraćanje knjige iz omiljenih nije moguće.",
        500
      )
    );
  }

  res.json({
    book: book.toObject({ getters: true }),
    user: user.toObject({ getters: true }),
  });
};

const downloadBook = async (req, res, next) => {
  const bookId = req.params.bid;

  let book;
  try {
    book = await Book.findById(bookId);
  } catch (err) {
    return next(
      new HttpError("Nešto nije u redu, preuzimanje knjige nije moguće.", 500)
    );
  }

  const filePath =
    "C:/Users/Administrator/Documents/GitHub/library_management_system/server/" +
    book.pdf.slice(22);

  const fileName = `book_${bookId}.pdf`;

  res.setHeader("Content-Type", "application/pdf");

  res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);

  fs.createReadStream(filePath).pipe(res);
};

const downloadTemplate = async (req, res, next) => {
  const filePath =
    "C:/Users/Administrator/Documents/GitHub/library_management_system/server/uploads/images/template.xlsx";

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  res.setHeader("Content-Disposition", `attachment; filename="template.xlsx"`);

  fs.createReadStream(filePath).pipe(res);
};

const importImage = async (req, res, next) => {
  const {
    title,
    genre,
    description,
    language,
    year_published,
    authorId,
    branchId,
  } = req.body;

  const { image } = req.file;

  let bookToUpdate;
  try {
    bookToUpdate = await Book.findOne({
      title,
      genre,
      description,
      language,
      year_published,
      author: authorId,
      branch: branchId,
    });
  } catch (err) {
    const error = new HttpError("Greška prilikom pretrage knjige.", 500);
    return next(error);
  }

  if (!bookToUpdate) {
    const error = new HttpError("Knjiga nije pronađena za datu pretragu.", 404);
    return next(error);
  }

  bookToUpdate.image = image.path;

  try {
    await bookToUpdate.save();
  } catch (err) {
    const error = new HttpError("Greška prilikom čuvanja knjige.", 500);
    return next(error);
  }

  res.status(200).json({ book: bookToUpdate });
};

const addBookComment = async (req, res, next) => {
  const bookId = req.params.bid;
  const { comment, userId } = req.body;

  let book;
  try {
    book = await Book.findById(bookId);
  } catch (err) {
    return next(
      new HttpError("Nešto nije u redu, rezervacija knjige nije moguća.", 500)
    );
  }

  if (!book) {
    return next(
      new HttpError("Nije moguće pronaći knjigu za pruženi ID."),
      404
    );
  }

  let foundUser;
  try {
    foundUser = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError("Nešto nije u redu, rezervacija knjige nije moguća.", 500)
    );
  }

  try {
    book.comments.push({
      commentDate: new Date().toISOString(),
      commentText: comment,
      userId: userId,
      userName: foundUser.name + " " + foundUser.surname,
      userBranches: foundUser.branches,
    });
    book.save();
    console.log("Successfully saved book.");
    foundUser.comments.push({
      commentDate: new Date().toISOString(),
      commentText: comment,
      bookId: bookId,
      bookName: book.title,
      bookAuthor: book.author,
    });
    foundUser.save();
    console.log("Successfully saved user.");
  } catch (err) {
    return next(
      new HttpError("Nešto nije u redu, dodavanje komentara nije moguće.", 500)
    );
  }

  res.status(200).json({
    book: book.toObject({ getters: true }),
    user: foundUser.toObject({ getters: true }),
  });
};

const getBookComments = async (req, res, next) => {
  const bookId = req.params.bid;

  let book;
  try {
    book = await Book.findById(bookId);
  } catch (err) {
    return next(
      new HttpError(
        "Nešto nije u redu, prikazivanje komentara nije moguće.",
        500
      )
    );
  }

  res.status(200).json({ comments: book.comments });
};

const addBookToWishlist = async (req, res, next) => {
  const bookId = req.params.bid;
  const { userId } = req.body;

  let book;
  try {
    book = await Book.findById(bookId);
  } catch (err) {
    return next(
      new HttpError("Nešto nije u redu, knjiga nije pronađena.", 500)
    );
  }

  if (!book) {
    return next(
      new HttpError("Nije moguće pronaći knjigu za pruženi ID."),
      404
    );
  }

  let foundUser;
  try {
    foundUser = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError(
        "Nešto nije u redu, dodavanje knjige među omiljene nije moguće.",
        500
      )
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    foundUser.wishlist.push(book);
    book.onWishlist.push(foundUser);
    await foundUser.save({ session: sess });
    await book.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError(
        "Nešto nije u redu, dodavanje knjige među omiljene nije moguće.",
        500
      )
    );
  }

  res.json({
    book: book.toObject({ getters: true }),
    user: foundUser.toObject({ getters: true }),
  });
};

const removeBookFromWishlist = async (req, res, next) => {
  const foundBookId = req.params.bid;
  const { userId } = req.body;

  let book;
  try {
    book = await Book.findById(foundBookId);
  } catch (err) {
    return next(
      new HttpError(
        "Nešto nije u redu, vraćanje knjige iz omiljenih nije moguće.",
        500
      )
    );
  }

  if (!book) {
    return next(
      new HttpError("Nije moguće pronaći knjigu za pruženi ID."),
      404
    );
  }

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError(
        "Nešto nije u redu, vraćanje knjige iz omiljenih nije moguće.",
        500
      )
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    book.onWishlist.pull(user);
    await book.save({ session: sess });
    user.wishlist.pull(book);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError(
        "Nešto nije u redu, vraćanje knjige iz omiljenih nije moguće.",
        500
      )
    );
  }

  res.json({
    book: book.toObject({ getters: true }),
    user: user.toObject({ getters: true }),
  });
};

exports.getBooksByBranch = getBooksByBranch;
exports.getBooksByUser = getBooksByUser;
exports.getBookAvailability = getBookAvailability;
exports.createBook = createBook;
exports.importBooksFromExcel = importBooksFromExcel;
exports.getBookById = getBookById;
exports.searchBooks = searchBooks;
exports.updateBook = updateBook;
exports.assignBook = assignBook;
exports.reserveBook = reserveBook;
exports.returnBook = returnBook;
exports.deleteBook = deleteBook;
exports.getFilters = getFilters;
exports.setBookAsFavourite = setBookAsFavourite;
exports.removeBookFromFavourites = removeBookFromFavourites;
exports.downloadBook = downloadBook;
exports.downloadTemplate = downloadTemplate;
exports.importImage = importImage;
exports.addBookComment = addBookComment;
exports.getBookComments = getBookComments;
exports.addBookToWishlist = addBookToWishlist;
exports.removeBookFromWishlist = removeBookFromWishlist;
