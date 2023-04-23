const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Author = require("../models/author");

const getAuthors = async (req, res, next) => {
  let authors;
  try {
    authors = await Author.find();
  } catch (err) {
    return next(
      new HttpError("Fetching authors failed, please try again later.", 500)
    );
  }
  res.json({
    authors: authors.map((user) => user.toObject({ getters: true })),
  });
};

const getAuthorById = async (req, res, next) => {
  const authorId = req.params.aid;

  let author;
  try {
    author = await Author.findById(authorId);
  } catch (err) {
    return next(
      new HttpError("Fetching author failed, please try again later.", 500)
    );
  }
  res.json({
    author: author.toObject({ getters: true }),
  });
};

const addAuthor = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, surname, biography, date_of_birth, nationality, age } =
    req.body;

  const newAuthor = new Author({
    name,
    surname,
    biography,
    date_of_birth,
    nationality,
    age,
    books: [],
  });

  try {
    await newAuthor.save();
  } catch (err) {
    return next(new HttpError("Adding author failed, please try again.", 500));
  }

  res.status(201).json({ author: newAuthor.toObject({ getters: true }) });
};

const updateAuthor = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, surname, biography, date_of_birth, nationality, age } =
    req.body;
  const authorId = req.params.aid;

  let author;
  try {
    author = await Author.findById(authorId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, couldn't update author."),
      500
    );
  }

  author.name = name;
  author.surname = surname;
  author.biography = biography;
  author.date_of_birth = date_of_birth;
  author.nationality = nationality;
  author.age = age;

  try {
    await author.save();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, couldn't update author."),
      500
    );
  }

  res.status(200).json({ author: author.toObject({ getters: true }) });
};

const deleteAuthor = async (req, res, next) => {
  const authorId = req.params.aid;

  let author;
  try {
    author = await Author.findById(authorId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, couldn't delete author."),
      500
    );
  }

  if (!author) {
    return next(
      new HttpError("Couldn't find an author for the provided ID."),
      404
    );
  }

  try {
    await author.remove();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, couldn't delete author."),
      500
    );
  }

  res.status(200).json({ message: "Deleted author." });
};

exports.getAuthors = getAuthors;
exports.getAuthorById = getAuthorById;
exports.addAuthor = addAuthor;
exports.updateAuthor = updateAuthor;
exports.deleteAuthor = deleteAuthor;
