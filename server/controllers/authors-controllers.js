const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Author = require("../models/author");

const getAuthors = async (req, res, next) => {
  let authors;
  try {
    authors = await Author.find();
  } catch (err) {
    return next(
      new HttpError(
        "Nalaženje autora nije uspelo, pokušajte ponovo kasnije.",
        500
      )
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
      new HttpError(
        "Nalaženje autora nije uspelo, pokušajte ponovo kasnije.",
        500
      )
    );
  }
  res.json({
    author: author.toObject({ getters: true }),
  });
};

const addAuthor = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Pogrešni unosi, proverite Vaše podatke.", 422));
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
    image: req.file ? "http://localhost:5000/" + req.file.path : null,
    books: [],
  });

  try {
    await newAuthor.save();
  } catch (err) {
    return next(
      new HttpError("Dodavanje autora nije uspelo, pokušajte ponovo.", 500)
    );
  }

  res.status(201).json({ author: newAuthor.toObject({ getters: true }) });
};

const updateAuthor = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Pogrešni unosi, proverite Vaše podatke.", 422));
  }

  const { name, surname, biography, date_of_birth, nationality, age } =
    req.body;
  const authorId = req.params.aid;

  let author;
  try {
    author = await Author.findById(authorId);
  } catch (err) {
    return next(
      new HttpError("Nešto nije u redu, ažuriranje autora nije moguće.", 500)
    );
  }

  author.name = name;
  author.surname = surname;
  author.biography = biography;
  author.date_of_birth = date_of_birth;
  author.nationality = nationality;
  author.age = age;
  author.image = req.file
    ? "http://localhost:5000/" + req.file.path
    : author.image;

  try {
    await author.save();
  } catch (err) {
    return next(
      new HttpError("Nešto nije u redu, ažuriranje autora nije moguće.", 500)
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
      new HttpError("Nešto nije u redu, brisanje autora nije moguće.", 500)
    );
  }

  if (!author) {
    return next(
      new HttpError("Nije moguće pronaći autora za pruženi ID."),
      404
    );
  }

  try {
    await author.remove();
  } catch (err) {
    return next(
      new HttpError("Nešto nije u redu, brisanje autora nije moguće.", 500)
    );
  }

  res.status(200).json({ message: "Autor je obrisan." });
};

exports.getAuthors = getAuthors;
exports.getAuthorById = getAuthorById;
exports.addAuthor = addAuthor;
exports.updateAuthor = updateAuthor;
exports.deleteAuthor = deleteAuthor;
