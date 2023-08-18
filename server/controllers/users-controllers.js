const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

const HttpError = require("../models/http-error");
const User = require("../models/user");
const Book = require("../models/book");
const Branch = require("../models/branch");

dotenv.config();

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    return next(
      new HttpError(
        "Nalaženje korisnika nije uspelo, pokušajte ponovo kasnije.",
        500
      )
    );
  }
  res.json({
    users: users.map((user) => user.toObject({ getters: true })),
  });
};

const getUserById = async (req, res, next) => {
  const uid = req.params.uid;
  let user;
  try {
    user = await User.findById(uid);
  } catch (err) {
    return next(
      new HttpError(
        "Nalaženje korisnika nije uspelo, pokušajte ponovo kasnije.",
        500
      )
    );
  }
  res.json({
    user: user.toObject({ getters: true }),
  });
};

const getUsersByBranch = async (req, res, next) => {
  const branchId = req.params.brid;

  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    return next(
      new HttpError(
        "Nalaženje korisnika nije uspelo, pokušajte ponovo kasnije.",
        500
      )
    );
  }
  res.json({
    users: users
      .filter((user) => user.branches.includes(branchId))
      .map((user) => user.toObject({ getters: true })),
  });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        "Nevalidni unosi, proverite svoje podatke i pokušajte ponovo.",
        422
      )
    );
  }
  const { name, surname, phone, email, password, branchId } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(
      new HttpError("Registracija nije uspela, pokušajte ponovo kasnije."),
      500
    );
  }

  if (existingUser) {
    return next(
      new HttpError("Korisnik sa ovom email adresom već postoji."),
      422
    );
  }

  const subscription_expiry = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  );

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(
      new HttpError("Registracija nije uspela, pokušajte ponovo kasnije.", 500)
    );
  }

  const newUser = new User({
    name,
    surname,
    phone,
    email,
    password: hashedPassword,
    subscription_expiry,
    is_admin: false,
    reservations: [],
    books: [],
    branches: [branchId],
    image: req.file ? "http://localhost:5000/" + req.file.path : null,
  });

  try {
    await newUser.save();
  } catch (err) {
    return next("Registracija nije uspela, pokušajte ponovo kasnije.", 500);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      "pitajkonobara",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(
      new HttpError("Registracija nije uspela, pokušajte ponovo kasnije.", 500)
    );
  }

  res.status(201).json({
    userId: newUser.id,
    email: newUser.email,
    is_admin: newUser.is_admin,
    name: newUser.name + " " + newUser.surname,
    token: token,
  });
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        "Uneti email i lozinka nisu ispravni. Pokušajte ponovo!",
        422
      )
    );
  }
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(
      new HttpError("Prijavljivanje nije uspelo. Pokušajte ponovo!"),
      500
    );
  }

  if (!existingUser) {
    return next(
      new HttpError("Netačan email i/ili lozinka. Pokušajte ponovo!"),
      401
    );
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(
      new HttpError("Netačan email i/ili lozinka. Pokušajte ponovo!", 500)
    );
  }

  if (!isValidPassword) {
    return next(
      new HttpError("Netačan email i/ili lozinka. Pokušajte ponovo!", 403)
    );
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "pitajkonobara",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(
      new HttpError("Prijavljivanje nije uspelo. Pokušajte ponovo!", 500)
    );
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    is_admin: existingUser.is_admin,
    name: existingUser.name + " " + existingUser.surname,
    token: token,
    image: existingUser.image,
  });
};

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const resetForgottenPassword = async (req, res, next) => {
  const accessToken = await oAuth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  const generatedPassword = Math.random().toString(36).slice(-10);
  const { email } = req.body;

  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    return next(
      new HttpError("Došlo je do greške, nije moguće pronaći korisnika.", 500)
    );
  }

  const userEmail = user.email;

  if (!userEmail) {
    return next(new HttpError("Nevažeća email adresa.", 400));
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Nova lozinka za pristup nalogu",
    html: `<html>
      <head>
        <style>
          body {
            background-color: #f0f0f0; /* Grey background to be visible in dark mode */
            text-align: center; /* Center-align text */
          }
          .card {
            border: 1px solid #c75d2c; /* Border around the card */
            padding: 20px; /* Spacing inside the card */
            background-color: #ffffff; /* White background of the card */
            display: inline-block; /* The card will be displayed in-line */
          }
          h1 {
            color: #c75d2c; /* Text color for h1 */
          }
        </style>
      </head>
      <body>
        <div class="card">
          <p>Your new password is: </p>
          <h1>${generatedPassword}</h1>
          <p>Using this password, you can now log in, and then, if you wish, change the password according to your needs.</p>
        </div>
      </body>
    </html>`,
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.log("Greška pri slanju mejla:", error);
      return next(new HttpError("Nije bilo moguće poslati mejl.", 500));
    } else {
      console.log("Mejl uspešno poslat:", info.response);

      // Update user's password in the database
      let hashedPassword;
      try {
        hashedPassword = await bcrypt.hash(generatedPassword, 12);
      } catch (err) {
        return next(
          new HttpError(
            "Neuspešno ažuriranje lozinke, pokušajte ponovo kasnije.",
            500
          )
        );
      }

      user.password = hashedPassword;

      try {
        await user.save();
      } catch (err) {
        return next(
          new HttpError(
            "Neuspešno ažuriranje lozinke, pokušajte ponovo kasnije.",
            500
          )
        );
      }

      res.status(200).json({ user: user.toObject({ getters: true }) });
    }
  });
};

const resetPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        "Uneta neispravna lozinka. Lozinka treba da sadrži najmanje 8 karaktera.",
        422
      )
    );
  }

  const { oldPassword, repeatedOldPassword, newPassword } = req.body;
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError(
        "Došlo je do greške, nije moguće ažurirati lozinku korisnika.",
        500
      )
    );
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(oldPassword, user.password);
  } catch (err) {
    const error = new HttpError(
      "Nije moguće prijaviti se, proverite svoje podatke i pokušajte ponovo.",
      500
    );
    return next(error);
  }

  if (oldPassword !== repeatedOldPassword) {
    return next(
      new HttpError(
        "Stara lozinka se ne podudara sa ponovo unetom starom lozinkom.",
        422
      )
    );
  } else if (!isValidPassword) {
    return next(
      new HttpError("Uneta lozinka se ne podudara sa starom lozinkom.", 422)
    );
  } else {
    try {
      let hashedPassword = await bcrypt.hash(newPassword, 12);
      user.password = hashedPassword;
      await user.save();
    } catch (err) {
      return next(
        new HttpError(
          "Došlo je do greške, nije moguće ažurirati lozinku korisnika.",
          500
        )
      );
    }
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

const updateUserData = async (req, res, next) => {
  const { name, surname, phone } = req.body;
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError(
        "Došlo je do greške, nije moguće ažurirati podatke korisnika.",
        500
      )
    );
  }

  if (name) {
    user.name = name;
  }
  if (surname) {
    user.surname = surname;
  }
  if (phone) {
    user.phone = phone;
  }

  try {
    await user.save();
  } catch (err) {
    return next(
      new HttpError(
        "Došlo je do greške, nije moguće ažurirati podatke korisnika.",
        500
      )
    );
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

const getUserReservations = async (req, res, next) => {
  const startDate = req.query.startdate;
  const endDate = req.query.enddate;
  const bookName = req.query.bookname;
  const userId = req.params.uid;

  let startDateFormatted = new Date(startDate);
  let endDateFormatted = new Date(endDate);

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError("Nije moguće pronaći korisnika sa datim ID-jem.", 404)
    );
  }

  let bookIds;
  let books = [];
  let bookGenres = [];
  let bookAuthors = [];
  let filteredReservations = [];
  if (user.reservations) {
    bookIds = user.reservations.map((reservation) => reservation.bookId);
  }

  if (startDate !== "" && endDate !== "") {
    for (let i = 0; i < user.reservations.length; i++) {
      let resDate = new Date(user.reservations[i].reservationDate);
      if (resDate > startDateFormatted && resDate < endDateFormatted) {
        filteredReservations.push(user.reservations[i]);
      }
    }
    bookIds = filteredReservations.map((reservation) => reservation.bookId);
  }

  for (let j = 0; j < bookIds.length; j++) {
    try {
      let book = await Book.findById(bookIds[j]);
      if (
        bookName == "" ||
        book.title.toLowerCase().includes(bookName.toLowerCase())
      ) {
        books.push(book);
      }
      bookGenres.push(book.genre);
      bookAuthors.push(book.authorName);
    } catch (err) {
      return next(
        new HttpError(
          "Nije moguće pronaći knjige za datog korisnika, pokušajte ponovo kasnije.",
          500
        )
      );
    }
  }

  if (startDate == "" && endDate == "") {
    res.json({
      reservations: user.reservations.map((reservation) =>
        reservation.toObject({ getters: true })
      ),
      books,
    });
  } else {
    res.json({
      reservations: filteredReservations,
      books,
      bookGenres,
      bookAuthors,
    });
  }
};

const getUserDataFromBranch = async (req, res, next) => {
  const startDate = req.query.startdate;
  const endDate = req.query.enddate;
  const branchId = req.params.brid;

  let startDateFormatted = new Date(startDate);
  let endDateFormatted = new Date(endDate);

  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    return next(
      new HttpError(
        "Nalaženje korisnika nije uspelo, pokušajte ponovo kasnije.",
        500
      )
    );
  }

  users = users.filter((user) => user.branches.includes(branchId));

  let bookIds = [];
  let bookTitles = [];
  let bookGenres = [];
  let bookAuthors = [];
  let filteredReservations = [];

  for (let user of users) {
    if (user.reservations) {
      bookIds = user.reservations.map((reservation) => reservation.bookId);
    }

    if (startDate !== "" && endDate !== "") {
      for (let i = 0; i < user.reservations.length; i++) {
        let resDate = new Date(user.reservations[i].reservationDate);
        if (resDate > startDateFormatted && resDate < endDateFormatted) {
          filteredReservations.push(user.reservations[i]);
        }
      }
      bookIds = filteredReservations.map((reservation) => reservation.bookId);
    }

    for (let j = 0; j < bookIds.length; j++) {
      try {
        let book = await Book.findById(bookIds[j]);
        if (book) {
          bookTitles.push(book.title);
          bookGenres.push(book.genre);
          bookAuthors.push(book.authorName);
        }
      } catch (err) {
        return next(
          new HttpError(
            "Nije moguće pronaći knjige za datog korisnika, pokušajte ponovo kasnije.",
            500
          )
        );
      }
    }
  }

  res.json({
    users,
    bookAuthors,
    bookGenres,
    bookTitles,
  });
};

const getCurrentReservations = async (req, res, next) => {
  const userId = req.params.uid;

  let today = new Date();

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError("Nije moguće pronaći korisnika sa datim ID-jem.", 404)
    );
  }

  let bookIds;
  let books = [];
  let filteredReservations = [];
  if (user.reservations) {
    bookIds = user.reservations.map((reservation) => reservation.bookId);
  }
  try {
    for (let i = 0; i < user.reservations.length; i++) {
      let resDate = new Date(user.reservations[i].reservationDate);
      let endDate = new Date(user.reservations[i].returnDate);
      if (today > resDate && today < endDate) {
        filteredReservations.push(user.reservations[i]);
      }
    }
    bookIds = filteredReservations.map((reservation) => reservation.bookId);
  } catch (err) {
    return next(new HttpError("Nisu pronađene rezervacije.", 404));
  }

  for (let j = 0; j < bookIds.length; j++) {
    try {
      let book = await Book.findById(bookIds[j]);
      books.push(book);
    } catch (err) {
      return next(
        new HttpError(
          "Nije moguće pronaći knjige za datog korisnika, pokušajte ponovo kasnije.",
          500
        )
      );
    }
  }

  res.json({
    reservations: filteredReservations,
    books,
  });
};

const getUserBranches = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError("Nije moguće pronaći korisnika sa datim ID-jem.", 404)
    );
  }

  let branches = [];
  try {
    for (let i = 0; i < user.branches.length; i++) {
      let branch = await Branch.findById(user.branches[i]);
      branches.push(branch);
    }
  } catch (err) {
    return next(
      new HttpError(
        "Nije moguće pronaći ogranke, pokušajte ponovo kasnije.",
        404
      )
    );
  }

  res.json({ branches });
};

const addUserBranch = async (req, res, next) => {
  const userId = req.params.uid;
  const { branchId } = req.body;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError("Došlo je do greške, nije moguće dodati korisnika."),
      500
    );
  }

  if (!user) {
    return next(
      new HttpError("Nije moguće pronaći korisnika sa datim ID-jem."),
      404
    );
  }

  let branch;
  try {
    branch = await Branch.findById(branchId);
  } catch (err) {
    return next(
      new HttpError("Došlo je do greške, nije moguće izmeniti ogranak."),
      500
    );
  }

  try {
    user.branches.push(branch);
    user.save();
    branch.users.push(user);
    branch.save();
  } catch (err) {
    return next(
      new HttpError("Došlo je do greške, nije moguće izmeniti ogranak."),
      500
    );
  }

  res.status(200).json({
    branch: branch.toObject({ getters: true }),
    user: user.toObject({ getters: true }),
  });
};

const getUserFavorites = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError("Nije moguće pronaći korisnika sa datim ID-jem.", 404)
    );
  }

  let favorites = [];
  try {
    for (let i = 0; i < user.favorites.length; i++) {
      let book = await Book.findById(user.favorites[i]);
      favorites.push(book);
    }
  } catch (err) {
    return next(
      new HttpError(
        "Nije moguće dohvatiti omiljene knjige, pokušajte ponovo kasnije.",
        404
      )
    );
  }

  res.json({ favorites });
};

const getUserRecommendations = async (req, res, next) => {
  const uid = req.params.uid;

  let user;
  try {
    user = await User.findById(uid);
  } catch (err) {
    return next(
      new HttpError(
        "Nalaženje korisnika nije uspelo, pokušajte ponovo kasnije.",
        500
      )
    );
  }

  const favorites = user.favorites;
  let genres = [];
  let favoriteBooks = [];

  if (favorites.length >= 1) {
    for (let i = 0; i < favorites.length; i++) {
      let book;
      try {
        book = await Book.findById(favorites[i]);
        favoriteBooks.push(book);
      } catch (err) {
        return next(
          new HttpError(
            "Nalaženje knjige nije uspelo, pokušajte ponovo kasnije.",
            500
          )
        );
      }
    }
  }

  for (let book of favoriteBooks) {
    if (book != null) {
      let bookGenres = book.genre.split(", ");
      for (let j = 0; j < bookGenres.length; j++) {
        if (!genres.includes(bookGenres[j])) {
          genres.push(bookGenres[j]);
        }
      }
    }
  }

  genres = Array.from(new Set(genres));

  let books = [];
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

  books = books.filter((book) => {
    let hasGenre = false;
    for (let i = 0; i < genres.length; i++) {
      if (book.genre.includes(genres[i])) {
        hasGenre = true;
      }
    }
    for (let j = 0; j < favorites.length; j++) {
      if (book.id == favorites[j]) {
        hasGenre = false;
      }
    }
    return hasGenre;
  });

  res.json({ genres, books });
};

const getWishlistBooks = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError(
        "Prikaz liste želja nije moguć, pokušajte ponovo kasnije.",
        500
      )
    );
  }

  let wishlistBooks = [];

  for (let bookId of user.wishlist) {
    try {
      let book = await Book.findById(bookId);
      wishlistBooks.push(book);
    } catch (err) {
      return next(
        new HttpError(
          "Prikaz liste želja nije moguć, pokušajte ponovo kasnije.",
          500
        )
      );
    }
  }

  res.status(200).json({ wishlistBooks });
};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.getUsersByBranch = getUsersByBranch;
exports.signup = signup;
exports.login = login;
exports.resetForgottenPassword = resetForgottenPassword;
exports.resetPassword = resetPassword;
exports.updateUserData = updateUserData;
exports.getUserReservations = getUserReservations;
exports.getCurrentReservations = getCurrentReservations;
exports.getUserBranches = getUserBranches;
exports.addUserBranch = addUserBranch;
exports.getUserFavorites = getUserFavorites;
exports.getUserRecommendations = getUserRecommendations;
exports.getWishlistBooks = getWishlistBooks;
exports.getUserDataFromBranch = getUserDataFromBranch;
